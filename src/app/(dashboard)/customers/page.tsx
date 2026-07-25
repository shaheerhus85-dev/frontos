import type { Metadata } from "next";

import { CustomersKpiCard } from "@/components/dashboard/customers/customers-kpi-card";
import { CustomersWorkspace } from "@/components/dashboard/customers/customers-workspace";
import { customerRecords, customersKpis } from "@/data/customers";

export const metadata: Metadata = {
  title: "Customers",
};

export default function CustomersPage() {
  return (
    <section
      className="mx-auto grid w-full max-w-[1440px] grid-cols-12 gap-4 pb-2 lg:gap-5 xl:gap-6"
      aria-label="Customers dashboard"
    >
      {customersKpis.map((metric) => (
        <CustomersKpiCard
          key={metric.id}
          metric={metric}
          className="col-span-6 xl:col-span-3"
        />
      ))}

      <div className="col-span-12 min-w-0">
        <CustomersWorkspace customers={customerRecords} />
      </div>
    </section>
  );
}
