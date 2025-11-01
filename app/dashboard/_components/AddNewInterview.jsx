

"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../../@/components/ui/dialog";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../@/components/ui/input";
import { Label } from "../../../@/components/ui/label";
import { Textarea } from "../../../@/components/ui/textarea";
import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { GenerateInterviewQuestions } from "../../../Actions/interview";
import {checkuserSubscriptionStatus} from "../../../Actions/UserSubscriptionStatus"
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";

function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false);
  const [openUpgradeModal, setOpenUpgradeModal] = useState(false);
  const [jobPosition, setJobPosition] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [experience, setExperience] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { user } = useUser();
  const email = user?.primaryEmailAddress?.emailAddress;

  const submitForm = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const {interviews,status} = await checkuserSubscriptionStatus(email);
  

      if (interviews.length >= 3 && status[0].planStatus === 'free') {
        setLoading(false);
        setOpenDialog(false)
        setOpenUpgradeModal(true); // Open the upgrade modal if limit exceeded
        return;
      }
    } catch (error) {
      console.error("Error fetching interviews:", error);
    }

    

    try {
      const mockId = await GenerateInterviewQuestions(
        jobPosition,
        jobDescription,
        experience
      );
      toast.success("Interview Generated Successfully");
      router.push(`/dashboard/interview/${mockId}`);
    } catch (error) {
      toast.error("Submission failed");
      console.error("Submission failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div
        onClick={() => setOpenDialog(true)}
        className="p-10 border rounded-lg border-gray-300 bg-neutral-900 hover:scale-105 hover:shadow-md hover:shadow-slate-500 cursor-pointer transition-all"
      >
        <h1 className="font-semibold text-lg text-center text-slate-200">
          + Add Interview
        </h1>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mx-auto max-w-2xl bg-neutral-950 text-white rounded-lg shadow-lg border border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-left font-bold text-2xl text-gray-100">
              Share Your Interview Experience
            </DialogTitle>
            <DialogDescription >
              
              <span className="text-left mt-2 text-sm text-gray-400">
              Let us know more about the job position, responsibilities, and
                your professional experience.
              </span>

              
            </DialogDescription>
            <form className="mt-6 space-y-6" onSubmit={submitForm}>
                {/* Job Role */}
                <div className="text-left">
                  <Label className="text-sm font-medium text-gray-300">
                    Job Role/Position
                  </Label>
                  <Input
                    placeholder="e.g., Full Stack Developer"
                    required
                    value={jobPosition}
                    onChange={(e) => setJobPosition(e.target.value)}
                    className="mt-2 bg-gray-800 border border-gray-600 text-gray-200 focus:ring focus:ring-blue-500"
                  />
                </div>

                {/* Job Description */}
                <div className="text-left">
                  <Label className="text-sm font-medium text-gray-300">
                    Job Description/Tech Stack
                  </Label>
                  <Textarea
                    placeholder="e.g., ReactJS, NodeJS, etc."
                    required
                    rows={5}
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    className="mt-2 bg-gray-800 border border-gray-600 text-gray-200 focus:ring focus:ring-blue-500 h-28"
                  />
                </div>

                {/* Years of Experience */}
                <div className="text-left">
                  <Label className="text-sm font-medium text-gray-300">
                    Years of Experience
                  </Label>
                  <Input
                    placeholder="e.g., 5"
                    type="text"
                    pattern="\d*"
                    maxLength={2}
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    required
                    className="mt-2 bg-gray-800 border border-gray-600 text-gray-200 focus:ring focus:ring-black"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-4 mt-8">
                  <Button
                    onClick={() => setOpenDialog(false)}
                    variant="outline"
                    className="px-6 py-2 border border-gray-500 bg-gray-800 text-gray-300 rounded-lg"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    className="px-6 py-2 bg-slate-200 text-black rounded-lg hover:bg-slate-300 focus:ring focus:ring-slate-700"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2Icon className="animate-spin" />
                        Generating...
                      </>
                    ) : (
                      "Start Interview"
                    )}
                  </Button>
                </div>
              </form>
          </DialogHeader>
        </DialogContent>
      </Dialog>


{/* Upgrade Modal */}
<Dialog open={openUpgradeModal} onOpenChange={setOpenUpgradeModal}>
  <DialogContent className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mx-auto max-w-md bg-neutral-900 text-white rounded-xl shadow-lg border border-gray-700 p-6">
    <DialogHeader className="text-center">
      <DialogTitle className="text-xl font-bold text-gray-100">
        🚀 Upgrade to Premium
      </DialogTitle>
      <DialogDescription className="text-sm text-gray-400 mt-2">
        You’ve reached the **free limit** of 3 mock interviews.
      </DialogDescription>
    </DialogHeader>

    <div className="flex flex-col items-center gap-4 mt-4 text-gray-300">
      <p className="text-sm text-gray-400">
        Unlock **unlimited interviews**, priority support, and premium features.
      </p>

      {/* Pricing Highlight */}
      <div className="w-full bg-gray-800 p-4 rounded-lg text-center border border-gray-700 shadow-md">
        <h3 className="text-lg font-semibold text-gray-200">Premium Plan</h3>
        <p className="text-sm text-gray-400">Only <span className="text-blue-400 font-semibold">$9.99/month</span></p>
      </div>
    </div>

    {/* Buttons */}
    <div className="flex justify-center gap-4 mt-6">
      <Button
        onClick={() => setOpenUpgradeModal(false)}
        variant="outline"
        className="px-6 py-2 border border-gray-600 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700"
      >
        Not Now
      </Button>
      <Button 
      onClick={() => router.push('/price')}
      className="px-6 py-2 bg-blue-600 rounded-lg ">
        Upgrade Now
      </Button>
    </div>
  </DialogContent>
</Dialog>


    </div>
  );
}

export default AddNewInterview;
