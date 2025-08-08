"use client";

import { useState, useMemo, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Filter, Star, X } from "lucide-react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import DialogModal from "@/components/dialog-modal";
import AccountInfo from "@/components/account-info";
import ConfirmCancelDialog from "@/components/dialog-modal";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const moderate = process.env.MODERATE_POLICY_DAYS;
const flexible = process.env.FLEXIBLE_POLICY_DAYS;
interface FilterState {
  location: string;
  minPrice: string;
  maxPrice: string;
}

const FilterDialog = ({
  open,
  onOpenChange,
  filters,
  onFilterChange,
  onApply,
  onClear,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  filters: { location: string; minPrice: string; maxPrice: string };
  onFilterChange: (field: keyof FilterState, value: string) => void;
  onApply: () => void;
  onClear: () => void;
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Filter Bookings</DialogTitle>
          <DialogDescription>
            Apply filters to find specific bookings
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="location" className="text-right">
              Location
            </Label>
            <Input
              id="location"
              value={filters.location}
              onChange={(e) => onFilterChange("location", e.target.value)}
              className="col-span-3"
              placeholder="Enter location"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="minPrice" className="text-right">
              Min Price
            </Label>
            <Input
              id="minPrice"
              type="number"
              value={filters.minPrice}
              onChange={(e) => onFilterChange("minPrice", e.target.value)}
              className="col-span-3"
              placeholder="Minimum price"
              min="0"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="maxPrice" className="text-right">
              Max Price
            </Label>
            <Input
              id="maxPrice"
              type="number"
              value={filters.maxPrice}
              onChange={(e) => onFilterChange("maxPrice", e.target.value)}
              className="col-span-3"
              placeholder="Maximum price"
              min="0"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClear}>
            Clear Filters
          </Button>
          <Button onClick={onApply}>Apply Filters</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [differenceDays, setDifferenceDays] = useState();
  const router = useRouter();
  const [showDialog, setShowDialog] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(
    null
  );
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [bookingToCancel, setBookingToCancel] = useState(null);
  const [tempFilters, setTempFilters] = useState({
    location: "",
    minPrice: "",
    maxPrice: "",
  });
  const [appliedFilters, setAppliedFilters] = useState({
    location: "",
    minPrice: "",
    maxPrice: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const fetchData = async () => {
    const getLocalData = await localStorage.getItem("token");
    const data = JSON.parse(getLocalData);
    if (data) {
      try {
        const response = await fetch(`${API_URL}/booking/data`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${data}`,
            "Content-Type": "application/json",
          },
        });
        const result = await response.json();
        setBookings(result.data);
      } catch (err) {
        console.error(err);
      }
    }
  };
  useEffect(() => {
    fetchData();
    setIsLoading(false);
  }, []);

  console.log("booking", bookings);
  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) => {
      console.log(booking.propertyId.address.city);
      const checkIn = new Date(booking.checkIn);
      const checkOut = new Date(booking.checkOut);

      const isUpcoming = checkIn.toDateString() > new Date().toDateString();
      const isPast = checkOut.toDateString() < new Date().toDateString();
      const isCancelled = booking.status === "Cancelled";

      const matchesTab =
        activeTab === "all" ||
        (activeTab === "upcoming" && isUpcoming) ||
        (activeTab === "past" && isPast) ||
        (activeTab === "cancelled" && isCancelled);

      const matchesLocation =
        !appliedFilters.location ||
        booking.propertyId.address.city
          .toLowerCase()
          .includes(appliedFilters.location.toLowerCase());

      const matchesMinPrice =
        !appliedFilters.minPrice ||
        booking.price >= parseInt(appliedFilters.minPrice);

      const matchesMaxPrice =
        !appliedFilters.maxPrice ||
        booking.price <= parseInt(appliedFilters.maxPrice);

      return (
        matchesTab && matchesLocation && matchesMinPrice && matchesMaxPrice
      );
    });
  }, [bookings, activeTab, appliedFilters]);

  console.log(filteredBookings);
  const handleClearFilters = () => {
    const emptyFilters = { location: "", minPrice: "", maxPrice: "" };
    setTempFilters(emptyFilters);
    setAppliedFilters(emptyFilters);
    setShowFilters(false);
  };

  const handleApplyFilters = () => {
    setAppliedFilters(tempFilters);
    setShowFilters(false);
  };

  const handleFilterChange = (field: keyof FilterState, value: string) => {
    setTempFilters((prev) => ({ ...prev, [field]: value }));
  };

  const removeFilter = (field: keyof FilterState) => {
    setAppliedFilters((prev) => ({ ...prev, [field]: "" }));
    setTempFilters((prev) => ({ ...prev, [field]: "" }));
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  const today = new Date().toLocaleDateString();
  const hour = new Date().getHours();

  const cancelBooking = async (
    bookingId,
    userEmail,
    hostEmail,
    userName,
    hostName
  ) => {
    try {
      const getLocalData = await localStorage.getItem("token");
      const data = JSON.parse(getLocalData);

      if (data) {
        const response = await fetch(`${API_URL}/booking/user/terminate`, {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${data}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            bookingId: bookingId,
            userEmail: userEmail,
            hostEmail: hostEmail,
            userName: userName,
            hostName: hostName,
          }),
        });
        if (!response.ok) {
          toast.error("Failed Refund Payment");
          return;
        }
        toast.success("Successfully send the cancellation email");
        fetchData();
        return response;
      }
    } catch (err) {
      console.error(err);
    }
  };
  const diff = (date) => {
    // // const futureDate = new Date(date);
    //     //   const date1 = new Date();
    //     // const differenceInDays = (futureDate - date1) / 86400000;
    //     return setDifferenceDays(differenceInDays)
  };

  return (
    <main className="py-16 md:py-24">
      <div className="container max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        <h1 className="text-2xl font-bricolage text-absoluteDark font-bold">
          My Booking
        </h1>

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full lg:w-auto"
          >
            <TabsList className="h-auto p-0 bg-transparent border-b border-gray-200 w-full lg:w-auto flex flex-wrap">
              {[
                { value: "all", label: "All" },
                { value: "upcoming", label: "Upcoming" },
                { value: "past", label: "Past" },
                { value: "cancelled", label: "Cancelled" },
              ].map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="relative h-9 rounded-none border-b-2 border-transparent px-2 sm:px-4 pb-3 pt-2 text-sm sm:text-base font-semibold text-muted-foreground data-[state=active]:border-primaryGreen data-[state=active]:text-primaryGreen "
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={() => setShowFilters(true)}
          >
            <Filter className="w-4 h-4" />
            Filters
          </Button>
          <FilterDialog
            open={showFilters}
            onOpenChange={setShowFilters}
            filters={tempFilters}
            onFilterChange={handleFilterChange}
            onApply={handleApplyFilters}
            onClear={handleClearFilters}
          />
        </div>

        {/* Active Filters Display */}
        {(appliedFilters.location ||
          appliedFilters.minPrice ||
          appliedFilters.maxPrice) && (
          <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <span>Active filters:</span>
            {appliedFilters.location && (
              <Badge variant="secondary" className="gap-1">
                Location: {appliedFilters.location}
                <X
                  className="w-3 h-3 cursor-pointer"
                  onClick={() => removeFilter("location")}
                />
              </Badge>
            )}
            {appliedFilters.minPrice && (
              <Badge variant="secondary" className="gap-1">
                Min Price: ₹{appliedFilters.minPrice}
                <X
                  className="w-3 h-3 cursor-pointer"
                  onClick={() => removeFilter("minPrice")}
                />
              </Badge>
            )}
            {appliedFilters.maxPrice && (
              <Badge variant="secondary" className="gap-1">
                Max Price: ₹{appliedFilters.maxPrice}
                <X
                  className="w-3 h-3 cursor-pointer"
                  onClick={() => removeFilter("maxPrice")}
                />
              </Badge>
            )}
          </div>
        )}

        <div className="space-y-4">
          <div className="hidden lg:grid grid-cols-[2fr,1fr,1fr,1fr,1fr] gap-4 px-4 py-2 bg-muted text-sm font-medium">
            <div>Property</div>
            <div>Date</div>
            <div>Status</div>
            <div>Price</div>
            <div></div>
          </div>

          {filteredBookings.map((booking) => (
            <Card key={booking?._id} className="p-4">
              <div className="grid grid-cols-1 lg:grid-cols-[2fr,1fr,1fr,1fr,1fr] gap-4">
                <div className="flex flex-col lg:flex-row gap-4">
                  <Image
                    alt="Property"
                    className="rounded-lg object-cover w-full lg:w-24 h-48 lg:h-24"
                    height={96}
                    src="/placeholder.svg"
                    width={96}
                  />
                  <div className="space-y-2">
                    <h3 className="font-medium">{booking?.property}</h3>
                    <p className="text-sm text-muted-foreground">
                      Located at {booking?.propertyId?.address.city}
                    </p>
                    {/* <div className="flex items-center gap-2">
                      <Avatar className="w-6 h-6">
                        <AvatarImage alt="Host" src="/placeholder.svg" />
                        <AvatarFallback>H</AvatarFallback>
                      </Avatar>
                      <div className="text-sm">
                        <span className="text-muted-foreground">Hosted by</span>{" "}
                        {booking.host}
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-primaryGreen text-primaryGreen" />
                          <span className="font-medium">{booking.rating}</span>
                          <span className="text-muted-foreground">
                            ({booking.reviews} reviews)
                          </span>
                        </div>
                      </div>
                    </div> */}
                  </div>
                </div>

                <div className="space-y-4 lg:space-y-2">
                  <div className="flex items-center gap-2">
                    {/* <Calendar className="w-4 h-4 text-muted-foreground" /> */}
                    <div className="text-sm">
                      <div className="text-muted-foreground">Check in</div>
                      <div>
                        {new Date(booking?.checkIn).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          }
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {/* <Calendar className="w-4 h-4 text-muted-foreground" /> */}
                    <div className="text-sm">
                      <div className="text-muted-foreground">Check out</div>
                      <div>
                        {new Date(booking?.checkOut).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          }
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 lg:space-y-2 ">
                  <Badge
                    variant="secondary"
                    className={`
                      ${
                        booking?.status === "Confirmed"
                          ? "bg-green-100 text-green-700"
                          : ""
                      }
                      ${
                        booking?.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : ""
                      }
                      ${
                        booking?.status === "Cancelled"
                          ? "bg-red-100 text-red-700"
                          : ""
                      }
                      hover:bg-opacity-80
                    `}
                  >
                    {booking?.status}
                  </Badge>
                </div>

                <div>
                  <div className="font-medium">
                    ₹{booking?.price?.toLocaleString()}
                  </div>
                  {/* <div className="text-sm text-muted-foreground">
                    Total {booking.nights} nights
                  </div> */}
                </div>

                <div className="flex">
                  {
                    // today == "7/24/2025" && hour==new Date(booking.checkOut).getHours()+5 ? (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-primaryGreen text-white py-3 rounded-md w-half mr-4"
                        onClick={() => {
                          router.push(`/rating?booking=${booking._id}`);
                          setShowDialog(true);
                        }}
                      >
                        Review Now
                      </Button>
                    </>
                    // )
                    // : (
                    //   ""
                    // )
                  }
                  {booking?.status != "cancelled" &&
                  booking?.status != "rejected" ? (
                    booking?.cancellationPolicy != "strict" ? (
                      // diff(booking?.checkOut) > moderate
                      today == "8/4/2025" &&
                      booking?.cancellationPolicy == "moderate" ? (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-primaryGreen text-white py-3 rounded-md w-half"
                            onClick={() => {
                              setBookingToCancel(booking); // store selected booking
                              setCancelDialogOpen(true); // open the dialog
                              // cancelBooking(
                              //   booking?._id,
                              //   booking?.userId?.email,
                              //   booking?.hostId?.email,
                              //   booking?.userId?.firstName +
                              //     " " +
                              //     booking?.userId?.lastName,
                              //   booking?.hostId?.firstName +
                              //     " " +
                              //     booking?.hostId?.lastName
                              // );
                            }}
                          >
                            Cancel
                          </Button>
                          {bookingToCancel && (
                            <ConfirmCancelDialog
                              choice={"Cancel"}
                              open={cancelDialogOpen}
                              onClose={() => {
                                setCancelDialogOpen(false);
                                setBookingToCancel(null);
                              }}
                              onConfirm={async () => {
                                await cancelBooking(
                                  bookingToCancel._id,
                                  bookingToCancel.userId.email,
                                  bookingToCancel.hostId.email,
                                  `${bookingToCancel.userId.firstName} ${bookingToCancel.userId.lastName}`,
                                  `${bookingToCancel.hostId.firstName} ${bookingToCancel.hostId.lastName}`
                                );
                                setCancelDialogOpen(false);
                                setBookingToCancel(null);
                              }}
                            />
                          )}
                        </>
                      ) : // diff(booking?.checkOut) > flexible
                      today == "8/4/2025" &&
                        booking?.cancellationPolicy == "flexible" ? (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-primaryGreen text-white py-3 rounded-md w-half"
                            onClick={() => {
                              setBookingToCancel(booking); // store selected booking
                              setCancelDialogOpen(true); // open the dialog
                            }}
                          >
                            Cancel
                          </Button>
                          {bookingToCancel && (
                            <ConfirmCancelDialog
                              choice={"Cancel"}
                              open={cancelDialogOpen}
                              onClose={() => {
                                setCancelDialogOpen(false);
                                setBookingToCancel(null);
                              }}
                              onConfirm={async () => {
                                await cancelBooking(
                                  bookingToCancel._id,
                                  bookingToCancel.userId.email,
                                  bookingToCancel.hostId.email,
                                  `${bookingToCancel.userId.firstName} ${bookingToCancel.userId.lastName}`,
                                  `${bookingToCancel.hostId.firstName} ${bookingToCancel.hostId.lastName}`
                                );
                                setCancelDialogOpen(false);
                                setBookingToCancel(null);
                              }}
                            />
                          )}
                        </>
                      ) : (
                        ""
                      )
                    ) : (
                      ""
                    )
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
};

export default ManageBookings;
