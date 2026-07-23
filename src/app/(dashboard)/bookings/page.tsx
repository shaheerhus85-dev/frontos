import type { Metadata } from "next";

import { BookingsKpiCard } from "@/components/dashboard/bookings/bookings-kpi-card";
import { BookingsWorkspace } from "@/components/dashboard/bookings/bookings-workspace";
import { bookingRecords, bookingsKpis } from "@/data/bookings";

export const metadata: Metadata = {
  title: "Bookings",
};

export default function BookingsPage() {
  return (
    <section
      className="mx-auto grid w-full max-w-[1440px] grid-cols-12 gap-4 pb-2 lg:gap-5 xl:gap-6"
      aria-label="Bookings dashboard"
    >
      {bookingsKpis.map((metric) => (
        <BookingsKpiCard
          key={metric.id}
          metric={metric}
          className="col-span-6 xl:col-span-3"
        />
      ))}

      <div className="col-span-12 min-w-0">
        <BookingsWorkspace bookings={bookingRecords} />
      </div>
    </section>
  );
}
