import React from "react";

const FooterComp = () => {
  return (
    <>
      <section data-aos="fade-down">
        <div className="text-[#5F6C7B] py-12 grid grid-cols-6 lg:grid-cols-12 gap-y-8 lg:gap-y-0 lg:gap-x-8">
          <div className="col-span-6 space-y-4">
            <h5 className="text-xl font-bold text-[#094067]">Tender App</h5>
            <p className="text-[#5F6C7B] tracking-wide leading-relaxed pr-8">
              Streamline tender and bidding processes with our app, featuring
              real-time updates, bid comparisons, and secure document handling
              for optimized procurement.
            </p>
          </div>
          <div className="col-span-6 sm:col-span-2">
            <h6 className="text-[#094067] text-sm font-bold uppercase tracking-wide mb-5">
              PAGE
            </h6>
            <ul className="space-y-2">
              
              <li>
                <a
                  href="/my/bids"
                  className="text-[#5F6C7B] hover:text-[#33393f] transition duration-300"
                >
                 Bids
                </a>
              </li>
            </ul>
          </div>
          <div className="col-span-6 sm:col-span-2">
            <h6 className="text-[#094067] text-sm font-bold uppercase tracking-wide mb-5">
              ABOUT
            </h6>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-[#5F6C7B] hover:text-[#33393f] transition duration-300"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[#5F6C7B] hover:text-[#33393f] transition duration-300"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[#5F6C7B] hover:text-[#33393f] transition duration-300"
                >
                  Gallery
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[#5F6C7B] hover:text-[#33393f] transition duration-300"
                >
                  Help
                </a>
              </li>
            </ul>
          </div>
          <div className="col-span-6 sm:col-span-2">
            <h6 className="text-[#094067] text-sm font-bold uppercase tracking-wide mb-5">
              SOCIAL MEDIA
            </h6>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-[#5F6C7B] hover:text-[#33393f] transition duration-300"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[#5F6C7B] hover:text-[#33393f] transition duration-300"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[#5F6C7B] hover:text-[#33393f] transition duration-300"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[#5F6C7B] hover:text-[#33393f] transition duration-300"
                >
                  Tiktok
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="py-12 border-t border-[rgba(144,180,206,0.25)] text-center text-sm font-bold tracking-wide uppercase text-[#5F6C7B]">
          COPYRIGHT © 2024 — DESIGN BY EjazAli
        </div>
      </section>
    </>
  );
};

export default FooterComp;
