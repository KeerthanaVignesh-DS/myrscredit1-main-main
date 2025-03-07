
import GuestLayout from "@/Layouts/GuestLayout";
import mainPic from "../../../assets/pic.jpg";
export default function ExplanationServices () {
  return (
    <>
     <GuestLayout>
        <div className="container py-5">
          <h2 className="primary-text-color text-center mb-4">
            Credit Analysis
          </h2>
          <div className="row">
             <p className="pb-1">
               The function of Myrs Credit Advisors, Inc. is to render an opinion
                concerning the credit worthiness of commercial entities in the USA
                and Canada.
              </p>
              <p className="pb-1">
               We specialize in the following industries: housewares,
              home furnishings, jewelry, gift, lighting, hardware, floral,
              craft, apparel, toy, stationery, specialty food, and related
              industries.
              </p>
              <p className="pb-1">
               The Myrs firm is composed of dedicated professionals,
              which deliver personal service to their clients. Each credit
              enquiry received from their clients is researched, investigated,
              and analyzed for credit worthiness. The Myrs staff is composed of
              professionals working directly for the client and with the client.
              </p>
              <p className="pb-1">
              Myrs has an extensive proprietary database that has been building
              since 1995 as well as access to numerous outside commercial
              databases, private and public. Myrs constantly interviews A/R
              managers and scours the industry media to further enhance the
              factual data at hand. 
              </p>
              <p className="pb-1">
              Myrs encourages their clients to contribute
              A/R data, but it is not mandatory. Some clients send monthly
              worksheets of all customer activity, other clients send only a
              worksheet of non-paying customers, some clients send a periodic
              email with a list of troublesome customers, and other clients send
              nothing. The choice as a client is yours.
              </p>
              <p className="pb-1">
               I have been managing account receivables since 1976 and have analyzed thousands and
              thousands of companies. My record of risk management speaks for
              itself.
              </p>
              <p className="pb-1">
               If you need to analyze a $300 high credit or a $150,000
              high credit, Myrs will get you the information you need. The fees
              are based on the “usage” basis. No memberships. No contracts. Pay
              as you go, for what you use. Report fees are minimal and custom
              pricing is always available for discussion. </p>
              <p className="pb-1">
              The Myrs system benefits the credit departments of USA importers, manufacturers,
              and distributors. It helps them to keep orders flowing on a daily
              basis with the confidence of the customer’s credit worthiness.
              </p>
              <p className="pb-1">
              Foreign exporters around the world and Outsource Service Providers
              in countries like India, Philippines, Dominican Republic, etc. are
              also utilizing the services of Myrs to assess the credit risk of
              their USA clients. Many of these BPO’s and IT providers engage the
              Myrs credit analysis service prior to signing contracts.
            </p>
          </div>
          <div className="row border-top pt-4">
               <div className="d-flex justify-content-center align-items-center">
                    <img src={mainPic} alt="Main Picture" />
               </div>
               <h3 className="primary-text-color mt-4 ">Collection Service:</h3>
               <p className="pb-1">
                  I am actively involved in mediation and dispute resolution for numerous export clients in China, India, various countries in the Mid-east, South America, and Europe. We work with banks, credit insurance organizations, and many individual companies large and small. Collection of funds is the ultimate goal, but mediation and dispute resolution are the keys to accomplish this monetary task. Often time we can collect the money, but also we have been able to save the business relationship as well.
               </p>
               <p className="pb-1">
                 The Import/Export industry and the Outsourcing Industry are my specialties, but I also work USA on USA collections. We can work the claim as long as the debtor is USA based. The creditor can be located anywhere. Commercial collections, only. Our fee policy has always been “No Cure, No Pay”. My advice is always free. Glad to discuss any problem you may encounter, without any obligation.
               </p>
               <p className="pb-1">
                  If you need help in either credit analysis or collection services, we can help.
                </p>
                <p className="pb-1">
                Steve Mertensmeyer,<br/>
                President of Myrs Credit Advisors, Inc.
                </p>
                <p className="pb-1">
                1319 Hickory St., Kansas City, Missouri USA, 816-421-1919 phone
                </p>
                <p className="pb-1">
                <a href="mailto:spmertensmeyer@MyrsCredit.com" className="primary-text-color text-decoration-none">spmertensmeyer@MyrsCredit.com</a>
                </p>
          </div>
        </div>
        </GuestLayout>
    </>
  );
};
