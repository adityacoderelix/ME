/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { use, useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
import { editSteps } from "../../add-listing/steps/steps";
import { StepIndicator } from "../../add-listing/components/step-indicator";
import { toast } from "sonner";
import { propertyService } from "@/services/propertyService";
import { useAuth } from "@/contexts/AuthContext";

export default function EditListing({ params }) {
  const { id } = use(params);
  const router = useRouter();
  const auth = useAuth();

  const [currentStep, setCurrentStep] = useState(0);
  const [originalData, setOriginalData] = useState(null);
  const [formData, setFormData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [initialStatus, setInitialStatus] = useState(null);

  useEffect(() => {
    const fetchListingData = async () => {
      if (!id) return;
      try {
        setIsLoading(true);
        const listing = await propertyService.getUserListingById(
          auth.user?.email,
          id
        );
        setOriginalData(listing);
        setFormData(listing);
        setInitialStatus(listing.status); // Store the initial status
      } catch (error) {
        toast.error("Failed to fetch listing data. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchListingData();
  }, [id, auth.user?.email]);
  console.log("which is this", formData);
  const checkForSignificantChanges = () => {
    const significantFields = ["images", "title", "description", "customRules"];
    return significantFields.some(
      (field) =>
        JSON.stringify(formData[field]) !== JSON.stringify(originalData[field])
    );
  };

  const determineNewStatus = (isExiting, hasSignificantChanges) => {
    if (isExiting && initialStatus === "incomplete") {
      return "incomplete";
    }
    if (hasSignificantChanges) {
      return "processing";
    }
    if (initialStatus === "active" || initialStatus === "processing") {
      return initialStatus;
    }
    return formData.status;
  };

  const saveData = async (isExiting = false) => {
    try {
      const hasSignificantChanges = checkForSignificantChanges();
      const newStatus = determineNewStatus(isExiting, hasSignificantChanges);

      const dataToSave = {
        ...formData,
        status: newStatus,
      };

      const response = await propertyService.updateProperty(id, dataToSave);
      setFormData(response);
      // toast.success("Progress saved successfully");
    } catch (error) {
      toast.error("Failed to save progress. Please try again.");
    }
  };

  const handleSubmit = async () => {
    const toastId = toast.loading("Updating your listing...");
    try {
      toast.loading("Updating your listing...");
      const hasSignificantChanges = checkForSignificantChanges();
      const newStatus = determineNewStatus(false, hasSignificantChanges);

      await propertyService.updateProperty(id, {
        ...formData,
        status: newStatus,
      });
      
      toast.dismiss(toastId);

      let successMessage;
      if (newStatus === "processing") {
        successMessage = "Listing has been updated and is under review.";
      } else if (newStatus === "active") {
        successMessage = "Listing has been updated successfully.";
      } else {
        successMessage = "Listing has been updated.";
      }

      toast.success(successMessage);
      router.push("/host/dashboard");
    } catch (error) {
      toast.dismiss(toastId); 
      toast.error("Something went wrong. Please try again.");
    }
  };

  const CurrentStepComponent = editSteps[currentStep].component;

  const validateCurrentStep = async () => {
    try {
      const currentStepData = editSteps[currentStep];
      if (
        currentStepData.requiresValidation &&
        typeof currentStepData.validate === "function"
      ) {
        const { isValid, errorMessage } = currentStepData.validate(formData);
        if (!isValid) {
          toast.error(
            errorMessage || "Validation failed. Please check the fields."
          );
          return false;
        }
      }
      return true;
    } catch (error) {
      toast.error("Unexpected error during validation. Please try again.");
      return false;
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleNext = async () => {
    if (editSteps[currentStep].requiresValidation) {
      const isValid = await validateCurrentStep();
      if (!isValid) return;
    }
    await saveData();
    if (currentStep < editSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleSaveAndExit = async () => {
    await saveData(true);
    router.push("/host/dashboard");
  };

  const updateFormData = (stepData) => {
    setFormData((prevData) => ({
      ...prevData,
      ...stepData,
    }));
  };
  useEffect(() => {
    if (window && !auth.user) redirect("/login");
  }, [auth.user]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!formData && !isLoading) {
    return <div>No listing data found.</div>;
  }

  return (
    <div className="flex flex-col relative h-full">
      <header className="bg-white w-screen z-50 top-0 fixed right-0 left-0 border-b border-b-gray-200 p-4">
        <div className="container max-w-7xl mx-auto px-4 flex justify-between items-center">
          <img className="h-7 w-auto" src="/images/logo.png" alt="Logo" />
          <StepIndicator
            currentStep={currentStep}
            totalSteps={editSteps.length}
          />
          <div className="gap-x-4 flex">
            <Drawer direction="right">
              <DrawerTrigger className="bg-gray-100 hover:bg-gray-200 text-sm text-absoluteDark border-absoluteDark border py-2 px-4 rounded-3xl">
                Help
              </DrawerTrigger>
              <DrawerContent className="h-full w-screen md:w-[400px] right-0 left-auto rounded-none">
                <DrawerClose className="absolute top-4 left-4 transition-colors rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6 m-auto text-absoluteDark"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                </DrawerClose>
                <DrawerTitle className="text-center text-absoluteDark font-medium">
                  Get Help
                </DrawerTitle>
                {/* ... (rest of the drawer content) */}
              </DrawerContent>
            </Drawer>
            <Button
              onClick={handleSaveAndExit}
              className="bg-gray-100 hover:bg-gray-200 text-sm text-absoluteDark border-absoluteDark border py-2 px-4 rounded-3xl"
            >
              Save & Exit
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-grow container mx-auto py-24 px-4">
        <div className="mx-auto">
          <CurrentStepComponent
            updateFormData={updateFormData}
            formData={formData}
          />
        </div>
      </main>
      <footer className="bg-white w-screen z-10 bottom-0 fixed right-0 left-0 border-t-4 border-t-gray-200 p-4">
        <div className="container max-w-7xl mx-auto px-4 flex justify-between items-center">
          <Button
            className="py-5 px-6 bg-gray-100 border-absoluteDark border text-absoluteDark font-normal rounded-3xl"
            onClick={handlePrevious}
            disabled={currentStep === 0}
            variant="ghost"
          >
            Back
          </Button>
          {currentStep === editSteps.length - 1 ? (
            <Button
              onClick={handleSubmit}
              className="bg-primaryGreen rounded-3xl hover:bg-brightGreen py-5 px-6 text-white"
            >
              Update Listing
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              className="bg-primaryGreen rounded-3xl hover:bg-brightGreen py-5 px-6 text-white"
            >
              Next
            </Button>
          )}
        </div>
      </footer>
    </div>
  );
}
