
import { Badge } from "@/components/ui/badge"
import { ArrowDown, ArrowUp, X, Check, Clock } from 'lucide-react'
import { Card } from "./ui/card"

export default function Component() {
 
const payments = []
  

  return (
 

        <Card className="flex-1 m-6 rounded-lg border p-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bricolage font-medium">Payments</h1>
            <p className="text-sm text-muted-foreground">
              Review your transactions for Majestic Escape bookings
            </p>
          </div>
{payments && payments.length > 0 ?
   
          <div className="overflow-x-auto rounded-lg border">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="px-4 py-3 text-left text-sm font-medium">Type</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Amount</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Property</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Payment Method</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Host</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment, index) => (
                  <tr key={index} className="border-b last:border-0">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {payment.direction === "up" ? (
                          <ArrowUp className="h-4 w-4 text-green-500" />
                        ) : (
                          <ArrowDown className="h-4 w-4 text-red-500" />
                        )}
                        <span className="text-sm">{payment.type}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">{payment.amount}</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col">
                        <span className="text-sm">{payment.property}</span>
                        <span className="text-xs text-muted-foreground">{payment.location}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">{payment.paymentMethod}</td>
                    <td className="px-4 py-3">
                      <Badge
                        variant="secondary"
                        className={`flex items-center justify-center gap-1.5 px-2 py-1.5 text-center rounded-full ${
                          payment.status === "Confirmed"
                            ? "bg-[#D1FFD4] text-primaryGreen"
                            : payment.status === "Pending"
                            ? "bg-[#FFEDB2] text-[#8B7915]"
                            : "bg-[#FFE0DD] text-[#FF0800]"
                        }`}
                      >
                        <span className={`flex items-center justify-center w-4 h-4 rounded-full border ${
                          payment.status === "Confirmed"
                            ? "border-primaryGreen bg-[#D1FFD4] text-primaryGreen"
                            : payment.status === "Pending"
                            ? "border-none text-[#8B7915] rounded-none"
                            : "border-[#FF0800] text-[#FF0800]"
                        }`}>
                          {payment.status === "Confirmed" ? (
                            <Check className="h-3 w-3" />
                          ) : payment.status === "Pending" ? (
                            <Clock className="h-4 w-4" />
                          ) : (
                            <X className="h-3 w-3" />
                          )}
                        </span>
                        <span className="text-xs font-medium">{payment.status}</span>
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-sm">{payment.host}</td>
                    <td className="px-4 py-3 text-sm">{payment.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          :
          <p>No payments received yet!</p>
              }
        </Card>
      
  )
}