import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Last({ property }) {
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
                {property.policies.cancellation === "Flexible"
                  ? "Free cancellation up to 24 hours before check-in."
                  : property.policies.cancellation === "Moderate"
                  ? "Refund 50% of the booking value when customers cancel the room within 5 days before the check-in time."
                  : "Strict cancellation policy. No refunds for cancellations made within 7 days of check-in."}
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">Check-in time</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Check-in</p>
                  <p>{property.policies.checkIn}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Check-out</p>
                  <p>{property.policies.checkOut}</p>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">House Rules</h3>
              <ul className="list-disc pl-5 text-sm text-muted-foreground">
                {property.policies.houseRules.map((rule, index) => (
                  <li key={index}>{rule}</li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
