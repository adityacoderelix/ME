import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const ListingStageCardSkeleton = () => {
  return (
    <Card className="bg-white animate-pulse">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium">
          <div className="h-6 w-48 bg-gray-200 rounded"></div>
        </CardTitle>
        <div className="h-6 w-6 bg-gray-200 rounded"></div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
          <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
          <div className="pt-2">
            <div className="h-10 w-32 bg-gray-200 rounded"></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ListingStageCardSkeleton;