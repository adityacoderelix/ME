"use client";

import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { ImageCarouselPopup } from "./image-carousel-popup";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://server-me.vercel.app/api/v1";

const StatusPill = ({ status }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "processing":
        return "bg-yellow-100 text-yellow-800";
      case "incomplete":
        return "bg-orange-100 text-orange-800";
      case "inactive":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <span
      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
        status
      )}`}
    >
      {status === "processing"
        ? "Sent for approval"
        : status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

const getUserPropertyListings = async (userEmail, page = 1, limit = 10) => {
  try {
    const getLocalData = await localStorage.getItem("token");
    const data = JSON.parse(getLocalData);

    const response = await axios.get(
      `${API_BASE_URL}/properties/user-properties/${userEmail}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${data}`,
        },
        params: { page, limit },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch user listings"
    );
  }
};

const SkeletonRow = ({ columns }) => (
  <TableRow>
    {columns.map((column, index) => (
      <TableCell key={index}>
        <Skeleton className="h-4 w-full" />
      </TableCell>
    ))}
  </TableRow>
);

export function HostListingsTable({ userEmail }) {
  const [data, setData] = useState([]);
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [listingToDelete, setListingToDelete] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [imagePopupOpen, setImagePopupOpen] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedPropertyName, setSelectedPropertyName] = useState("");
  const router = useRouter();
  const fetchListings = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getUserPropertyListings(userEmail, page);
      setData(response.listings);
    } catch (error) {
      console.error("Failed to fetch listings:", error);
      // You might want to show an error message to the user here
    } finally {
      setLoading(false);
    }
  }, [userEmail, page]);

  useEffect(() => {
    fetchListings();
  }, [fetchListings, userEmail]);

  const handleImageClick = useCallback((images, propertyName) => {
    setSelectedImages(images);
    setSelectedPropertyName(propertyName);
    setImagePopupOpen(true);
  }, []);

  const handleDeleteClick = useCallback((listing) => {
    setListingToDelete(listing);
    setDeleteDialogOpen(true);
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    if (listingToDelete) {
      try {
        const getLocalData = await localStorage.getItem("token");
        const data = JSON.parse(getLocalData);

        const response = await fetch(
          `${API_BASE_URL}/properties/user-property/${listingToDelete._id}`,
          {
            headers: {
              Authorization: `Bearer ${data}`,
              "Content-Type": "application/json",
            },
            method: "DELETE",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to delete the listing");
        }

        setData((prevData) =>
          prevData.filter((item) => item._id !== listingToDelete._id)
        );
        setDeleteDialogOpen(false);
        setListingToDelete(null);
        toast.success("Listing deleted successfully");
      } catch (error) {
        console.error("Failed to delete listing:", error);
        toast.error("Failed to delete listing");
        // You might want to show an error message to the user here
      }
    }
  }, [listingToDelete]);

  const columns = React.useMemo(
    () => [
      {
        accessorKey: "photos",
        header: "Thumbnail",
        cell: ({ row }) => {
          const photos = row.getValue("photos");
          return photos && photos.length > 0 ? (
            <Image
              src={photos[0] || "/placeholder.svg"}
              alt="Property thumbnail"
              width={50}
              height={50}
              className="rounded-md cursor-pointer"
              onClick={() => handleImageClick(photos, row.getValue("title"))}
            />
          ) : (
            <div className="w-[50px] h-[50px] bg-gray-200 rounded-md"></div>
          );
        },
      },
      {
        accessorKey: "title",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Title
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
      },
      {
        accessorKey: "propertyType",
        header: "Property Type",
      },
      {
        accessorKey: "placeType",
        header: "Place Type",
      },
      {
        accessorKey: "guests",
        header: "Guests",
      },
      {
        accessorKey: "bedrooms",
        header: "Bedrooms",
      },
      {
        accessorKey: "beds",
        header: "Beds",
      },
      {
        accessorKey: "bathrooms",
        header: "Bathrooms",
      },
      {
        accessorKey: "basePrice",
        header: () => <div className="text-right">Base Price</div>,
        cell: ({ row }) => {
          const price = Number.parseFloat(row.getValue("basePrice"));
          const formatted = new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
          }).format(price);

          return <div className="text-right font-medium">{formatted}</div>;
        },
      },
      {
        accessorKey: "status",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Status
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => <StatusPill status={row.getValue("status")} />,
      },
      {
        accessorKey: "createdAt",
        header: "Created At",
        cell: ({ row }) => (
          <div className="text-center">
            {new Date(row.getValue("createdAt")).toLocaleDateString()}
          </div>
        ),
      },
      {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
          const listing = row.original;

          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={() => navigator.clipboard.writeText(listing._id)}
                >
                  Copy listing ID
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() =>
                    router.push(`/host/dashboard/edit-listing/${listing._id}`)
                  }
                >
                  Edit listing
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleDeleteClick(listing)}>
                  Delete listing
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
    [handleImageClick, handleDeleteClick]
  );

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const handlePageChange = useCallback((newPage) => {
    setPage(newPage);
  }, []);

  return (
    <div className="w-full">
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the listing "
              {listingToDelete?.title}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleConfirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <ImageCarouselPopup
        isOpen={imagePopupOpen}
        onClose={() => setImagePopupOpen(false)}
        images={selectedImages}
        propertyName={selectedPropertyName}
      />
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter listings..."
          value={table.getColumn("title")?.getFilterValue() ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <Select
          value={table.getColumn("status")?.getFilterValue() ?? ""}
          onValueChange={(value) =>
            table.getColumn("status")?.setFilterValue(value)
          }
        >
          <SelectTrigger className="w-[180px] ml-2">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="processing">Sent for approval</SelectItem>
            <SelectItem value="incomplete">Incomplete</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {loading ? (
              Array.from({ length: 10 }).map((_, index) => (
                <SkeletonRow key={index} columns={columns} />
              ))
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(Math.max(page - 1, 1))}
            disabled={page === 1 || loading}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(page + 1)}
            disabled={data.length < 10 || loading}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
