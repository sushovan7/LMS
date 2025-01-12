import React from "react";
import partnerImage from "../assets/partnercompany/companies.webp";

function PartnerWith() {
  return (
    <section className="flex items-center mb-20 flex-col gap-5 min-h-[30vh]  justify-center">
      <div>
        <h1 className="font-md text-center text-3xl">
          Top <span className="font-mono text-[#23CFA6]">companies</span> our
        </h1>
        <h1 className="font-md text-center text-3xl">students working with</h1>
      </div>
      <div className="w-full overflow-hidden">
        <img src={partnerImage} alt="" />
      </div>
    </section>
  );
}

export default PartnerWith;
