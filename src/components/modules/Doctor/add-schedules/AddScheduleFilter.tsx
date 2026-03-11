"use client";
import RefreshButton from "@/components/shared/refresh-button";
// import RefreshButton from "@/components/shared/RefreshButton";

const AddSchedulesFilters = () => {
  return (
    <div className="space-y-3">
      {/* Row 1: Refresh Button */}
      <div className="flex items-center gap-3">
        <RefreshButton />
      </div>

   
    </div>
  );
};

export default AddSchedulesFilters;
