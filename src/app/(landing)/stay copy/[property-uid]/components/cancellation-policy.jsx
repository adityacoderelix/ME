import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Last() {
  return (
    <>
      <div className="pt-6">
        <Card>
          <CardHeader>
            <CardTitle>Things to know</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="space-y-2">
              <h3 className="font-semibold">Cancellation policy</h3>
              <p className="text-sm text-muted-foreground">
                Refund 50% of the booking value when customers cancel the room
                within 48 hours after successful booking and 14 days before the
                check-in time. Then, cancel the room 14 days before the check-in
                time, get a 50% refund of the total amount paid (minus the
                service fee).
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">Check-in time</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Check-in</p>
                  <p>02:00 pm - 04:00 pm</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Check-out</p>
                  <p>10:00 am - 11:00 am</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
