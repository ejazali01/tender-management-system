import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateTenderEndTime } from "../redux/reducers/TenderSlice";
import { Button, Dialog, DialogBody, DialogFooter, Input } from "@material-tailwind/react";
import toast from "react-hot-toast";

const EditTenderEndTime = ({ tenderId, currentEndTime, open, handleClose }) => {
  const [newEndTime, setNewEndTime] = useState(currentEndTime);
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();

  const handleUpdate = async () => {
    const currentTime = new Date();
    const selectedEndTime = new Date(newEndTime);

    if (selectedEndTime <= currentTime) {
      setErrorMessage("The new end time must be greater than the current time.");
      return;
    }

    setErrorMessage("");

    try {
      await dispatch(updateTenderEndTime({ tenderId, newEndTime })).unwrap();
      toast.success("Tender end time updated successfully!");
      handleClose();
    } catch (error) {
      toast.error("An error occurred while updating the tender end time.");
    }
  };

  return (
    <Dialog open={open} handler={handleClose}>
      <DialogBody>
        <div className="flex flex-col gap-4">
          <label className="text-sm">New End Time</label>
          <Input
            type="datetime-local"
            value={newEndTime}
            onChange={(e) => setNewEndTime(e.target.value)}
            className="border-2 border-gray-700 px-2 rounded-md"
          />
                    {errorMessage && <span className="text-sm text-red-500">{errorMessage}</span>}
        </div>
      </DialogBody>
      <DialogFooter>
        <Button variant="text" color="red" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="text" color="green" onClick={handleUpdate}>
          Update
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default EditTenderEndTime;
