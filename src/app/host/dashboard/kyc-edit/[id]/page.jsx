"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { steps } from "../../kyc/steps/steps";
import { StepIndicator } from "../../kyc/components/step-indicator";
import { redirect, useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { kycService } from "@/services/kycService";
import { Loader2 } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import confetti from "canvas-confetti";
import { use } from "react";

export default function KycEdit({ params }) {
  const { id } = use(params);
  const router = useRouter();
  const auth = useAuth();

  const queryClient = useQueryClient();

  const [isNextDisabled, setIsNextDisabled] = useState(true);

  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showKYCDialog, setShowKYCDialog] = useState(false);
  const [showCongratulationsDialog, setShowCongratulationsDialog] =
    useState(false);
  const [formData, setFormData] = useState([]);

  useEffect(() => {
    const fetchFormData = async () => {
      if (!id) return;
      try {
        setIsLoading(true);
        const response = await kycService.getFormDataById(id);
        const result = await response.data;
        console.log("thi v", result);

        setFormData(result);
        return result;
      } catch (error) {
        toast.error("Failed to fetch form data. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchFormData();
  }, [id, auth.user?.email]);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      toast.loading("Updating your listing...");
      await kycService.updateProperty(id, {
        ...formData,
        status: "processing",
      });

      toast.success("KYC updated successfully.");

      router.push("/host/dashboard");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  const saveData = async (isExiting = false) => {
    setIsLoading(true);
    try {
      const dataToSave = {
        ...formData,
        status:
          isExiting || currentStep < steps.length - 1
            ? "incomplete"
            : "processing",
      };

      const response = id
        ? await kycService.updateProperty(id, dataToSave)
        : await kycService.createProperty(dataToSave);

      if (!id) setId(response._id);
      setFormData(response);

      queryClient.invalidateQueries({
        queryKey: ["KYCStatus", auth.user.email],
      });
    } catch (error) {
      toast.success("Updated your KYC profile");
    } finally {
      setIsLoading(false);
    }
  };
  const CurrentStepComponent = steps[currentStep].component;

  const validateCurrentStep = async () => {
    try {
      const currentStepData = steps[currentStep];
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

  const handleRedirectToDashboard = () => {
    router.push("/host/dashboard");
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleNext = async () => {
    if (steps[currentStep].requiresValidation) {
      const isValid = await validateCurrentStep();
      if (!isValid) return;
    }
    await saveData();
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleSaveAndExit = () => {
    setIsLoading(true);
    console.log("Saving data:", formData);
    router.push("/host/dashboard");
  };

  const updateFormData = (stepData) => {
    setFormData((prevData) => ({
      ...prevData,
      ...stepData,
    }));
  };

  useEffect(() => {
    if (!auth) redirect("/login");
  }, [auth]);

  console.log("ddd", formData);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!formData && !isLoading) {
    return <div>No Form data found.</div>;
  }

  return (
    <div className="flex flex-col relative min-h-screen">
      <header className="bg-white w-screen z-50 top-0 fixed right-0 left-0 border-b border-b-gray-200 p-4">
        <div className="container max-w-7xl mx-auto px-4 flex justify-between items-center">
          <img className="h-7 w-auto" src="/images/logo.png" alt="Logo" />
          <StepIndicator currentStep={currentStep} totalSteps={steps.length} />
          <div className="gap-x-4 flex">
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
        <div className="max-w-3xl mx-auto">
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
          {currentStep === steps.length - 1 ? (
            <Button
              onClick={handleSubmit}
              className="bg-primaryGreen rounded-3xl hover:bg-brightGreen py-5 px-6 h-12 text-white"
            >
              Update
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              className="bg-primaryGreen rounded-3xl transition-all hover:bg-brightGreen w-48 h-12 px-6 text-white"
            >
              Next
            </Button>
          )}
        </div>
      </footer>

      <Dialog open={showKYCDialog} onOpenChange={setShowKYCDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>KYC Verification Complete</DialogTitle>
          </DialogHeader>
          <p>
            Your KYC verification process is complete. You can now proceed to
            the dashboard.
          </p>
          <DialogFooter>
            <Button onClick={handleRedirectToDashboard}>Go to Dashboard</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={showCongratulationsDialog}
        onOpenChange={setShowCongratulationsDialog}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Congratulations!</DialogTitle>
          </DialogHeader>
          <p>
            Your KYC has been successfully submitted. What would you like to do
            next?
          </p>
          <DialogFooter className="flex justify-between">
            <Button
              onClick={() => router.push("/host/dashboard/bank-info")}
              variant="outline"
            >
              Add Bank Account Details
            </Button>
            <Button onClick={() => router.push("/host/dashboard")}>
              Go to Dashboard
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
