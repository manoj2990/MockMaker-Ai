
import PaymentButton from "../../razorpayPayment/paymentButton";


export default function UpgradePage() {



    const plans = [
      {
        name: "Free",
        price: "0₹",
        features: [
          { text: "Create 3 Free Mock Interviews", available: true },
          { text: "Unlimited Retake Interview", available: true },
          { text: "Practice Questions", available: false },
          { text: "Exclusive Help support", available: false },
          { text: "Email Support", available: false },
        ],
        text: "Free"
      },
      {
        name: "Monthly",
        price: "1999₹",
        features: [
          { text: "Create Unlimited Mock Interviews", available: true },
          { text: "Unlimited Retake Interview", available: true },
          { text: "Practice Questions", available: true },
          { text: "Exclusive Help support", available: true },
          { text: "Email Support", available: true },
        ],
        text: "payment",
        amount: 1999
      },
    ];
  
    return (
      <div className={`flex flex-col items-center justify-center min-h-screen bg-neutral-950 text-white p-6`}>
        <h1 className="text-4xl font-extrabold mb-2">Upgrade</h1>
        <p className="text-gray-400 mb-8 text-lg">Upgrade to a monthly plan to access unlimited mock interviews</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className="bg-[#161B22] p-8 rounded-xl shadow-lg border border-gray-700 w-80 text-center hover:scale-105 transition-transform duration-300"
            >
              <h2 className="text-2xl font-semibold mb-2">{plan.name}</h2>
              <p className="text-4xl font-bold mb-4">{plan.price} <span className="text-lg">/month</span></p>
              <ul className="mt-4 space-y-3 text-gray-300">
                {plan.features.map((feature, i) => (
                  <li key={i} className=" flex gap-3">
                    {feature.available ? <div className=" text-green-500">✔</div> :  <div className=" text-red-500">✖</div>}{feature.text}
                  </li>
                ))}
              </ul>
              
              <PaymentButton
              text ={plan.text}
              amount={plan.amount}
               className={"mt-6 w-full border border-purple-500 text-purple-500 py-3 rounded-lg hover:bg-purple-600 hover:text-white transition duration-300"}
               />

            </div>
          ))}
        </div>
      </div>
    );
  }
  