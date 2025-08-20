"use client";

import { useState, useRef, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function AccountInfo() {
  const auth = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const fileInputRef = useRef(null);

  // Fetch profile information when the user's email is available
  useEffect(() => {
    if (!auth?.user?.email) return;

    const fetchProfileInfo = async () => {
      try {
        const res = await fetch(`${API_URL}/accounts?email=${auth.user.email}`);
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        console.log("Fetched Data:", data);
        setProfileData(data);
        setAvatarUrl(data.avatarUrl || data.profilePicture);
      } catch (error) {
        console.error("Error fetching profile info:", error);
      }
    };

    fetchProfileInfo();
  }, [auth?.user?.email]);

  function formatDOB(dobString) {
    const date = new Date(dobString);
    if (isNaN(date.getTime())) {
      return "Invalid Date";
    }
    // Format options: month as long name, day as numeric, and year as numeric.
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  }

  // Trigger file input click when avatar is clicked
  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  // Handle file upload and convert file to base64 URL
  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarUrl(e.target?.result);
      };
      reader.readAsDataURL(file);
    } else {
      toast.error("Please select a valid JPG or PNG file.");
    }
  };

  // Update phone number in state
  const handleChangePhone = (e) => {
    setProfileData((prev) => ({ ...prev, phone: e.target.value }));
  };

  // Update address fields in state
  const handleChangeAddress = (field, value) => {
    setProfileData((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        [field]: value,
      },
    }));
  };

  // Submit the updated profile data via a PUT request
  const handleSubmit = async () => {
    // Build the form data payload matching the backend route requirements
    const formData = {
      firstName: profileData.firstName,
      lastName: profileData.lastName,
      dob: profileData.dob, // Date of Birth (non-editable)
      phoneNumber: profileData.phone,
      profilePicture: avatarUrl,
      address: {
        street: profileData.address?.street || "",
        city: profileData.address?.city || "",
        state: profileData.address?.state || "",
        postalCode: profileData.address?.postalCode || "",
        country: profileData.address?.country || "",
      },
      governmentIdType: profileData.governmentIdType,
    };

    try {
      const res = await fetch(
        `${API_URL}/accounts?email=${profileData.email}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to save profile");
      }

      const updatedData = await res.json();
      toast.success("Profile updated successfully!");
      setProfileData(updatedData); // Update local state with the latest profile data
    } catch (error) {
      console.error("Error saving profile:", error);
      toast.error("Failed to save profile.");
    }
  };

  // Render a skeleton view until profileData is loaded
  if (!profileData) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <Card>
          <CardContent className="p-6 animate-pulse space-y-6">
            {/* Skeleton for Profile Image */}
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-gray-300 rounded-full" />
              <div className="flex-1">
                <div className="h-4 bg-gray-300 rounded w-1/3 mb-2" />
                <div className="h-3 bg-gray-300 rounded w-1/2" />
              </div>
            </div>
            {/* Skeleton for Full Name */}
            <div>
              <div className="h-4 bg-gray-300 rounded w-1/2 mb-2" />
            </div>
            <hr className="border-gray-300" />
            {/* Skeleton for Email */}
            <div>
              <div className="h-4 bg-gray-300 rounded w-2/3 mb-2" />
            </div>
            <hr className="border-gray-300" />
            {/* Skeleton for Date of Birth */}
            <div>
              <div className="h-4 bg-gray-300 rounded w-1/4 mb-2" />
            </div>
            <hr className="border-gray-300" />
            {/* Skeleton for Phone */}
            <div>
              <div className="h-10 bg-gray-300 rounded" />
            </div>
            <hr className="border-gray-300" />
            {/* Skeleton for Government ID */}
            <div>
              <div className="h-4 bg-gray-300 rounded w-1/3 mb-2" />
              <div className="h-3 bg-gray-300 rounded w-1/4" />
            </div>
            <hr className="border-gray-300" />
            {/* Skeleton for Address */}
            <div className="space-y-2">
              <div className="h-10 bg-gray-300 rounded" />
              <div className="grid grid-cols-2 gap-2">
                <div className="h-10 bg-gray-300 rounded" />
                <div className="h-10 bg-gray-300 rounded" />
              </div>
              <div className="h-10 bg-gray-300 rounded" />
              <div className="h-10 bg-gray-300 rounded" />
            </div>
            {/* Skeleton for Save Button */}
            <div className="pt-4">
              <div className="h-12 bg-gray-300 rounded w-32" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Card>
        <CardContent className="p-6 space-y-6">
          {/* Profile Image */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Profile Image</h2>
            <div className="flex items-center gap-4">
              <Avatar
                className="w-20 h-20 cursor-pointer"
                onClick={handleAvatarClick}
              >
                <AvatarImage
                  src={avatarUrl || "/placeholder.svg"}
                  alt="Profile"
                />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/jpeg, image/png"
                className="hidden"
              />
              <p className="text-sm text-muted-foreground">
                Click on the avatar to upload your own image.
              </p>
            </div>
          </div>

          {/* Full Name (non-editable) */}
          <div>
            <h2 className="text-lg font-semibold mb-1">Full Name</h2>
            <p>
              {profileData.firstName} {profileData.lastName}
            </p>
          </div>
          <hr />
          <div>
            <h2 className="text-lg font-semibold mb-1">Date of Birth</h2>
            <p>{formatDOB(profileData?.dob)}</p>
          </div>
          <hr />

          {/* Email Address (non-editable) */}
          <div>
            <h2 className="text-lg font-semibold mb-1">Email Address</h2>
            <p>{profileData.email}</p>
          </div>
          <hr />

          {/* Date of Birth (non-editable) */}

          {/* Phone Number (editable) */}
          <div>
            <h2 className="text-lg font-semibold mb-1">Phone no.</h2>
            <Input
              placeholder="+91 9876543211"
              value={profileData.phone || ""}
              onChange={handleChangePhone}
            />
          </div>
          <hr />

          {/* Government Registered ID */}
          <div>
            <h2 className="text-lg font-semibold mb-1">
              Government Registered ID
            </h2>
            {profileData.governmentIdType ? (
              <p>{profileData.governmentIdType}</p>
            ) : (
              <>
                <p className="text-red-500 py-1.5 px-2 block rounded bg-red-50 text-sm font-medium border border-red-500 mb-2">
                  You haven't completed your KYC yet.
                </p>
                <Link
                  href="#"
                  className="text-primaryGreen hover:text-brightGreen underline"
                >
                  Complete KYC
                </Link>
              </>
            )}
          </div>
          <hr />

          {/* Detailed Address (editable) */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Detailed Address</h2>
            <div className="space-y-2">
              <Input
                className="h-10"
                placeholder="Street"
                value={profileData.address?.street || ""}
                onChange={(e) => handleChangeAddress("street", e.target.value)}
              />
              <div className="grid grid-cols-2 gap-2">
                <Input
                  className="h-10"
                  placeholder="City"
                  value={profileData.address?.city || ""}
                  onChange={(e) => handleChangeAddress("city", e.target.value)}
                />
                <Input
                  className="h-10"
                  placeholder="State"
                  value={profileData.address?.state || ""}
                  onChange={(e) => handleChangeAddress("state", e.target.value)}
                />
              </div>
              <Input
                className="h-10"
                placeholder="Postal Code"
                value={profileData.address?.postalCode || ""}
                onChange={(e) =>
                  handleChangeAddress("postalCode", e.target.value)
                }
              />
              <Input
                className="h-10"
                placeholder="Country"
                value={profileData.address?.country || ""}
                onChange={(e) => handleChangeAddress("country", e.target.value)}
              />
            </div>
          </div>

          {/* Save Button */}
          <div className="pt-4">
            <Button
              className="inline-block h-12 px-12 bg-primaryGreen hover:bg-brightGreen text-white"
              onClick={handleSubmit}
            >
              Save
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
