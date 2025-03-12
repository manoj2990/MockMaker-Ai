"use client";



import { MovingBorderDemo } from './MovingBorderDemo';

const footerLinks = [
  {
    title: "Discover",
    links: ["Practice", "AI Coach", "Interview Questions", "Mock Tests"],
  },
  {
    title: "About",
    links: ["Our Team", "Careers", "Blog"],
  },
  {
    title: "Resources",
    links: ["Security", "Privacy Policy", "Support"],
  },
];

export default function Footer() {



  return (
    <footer className="bg-neutral-900 text-gray-400 py-10 mt-20">
      <div className="container mx-auto px-6 md:px-12">
        
        {/*  Subscription Section */}
        <div className="flex flex-col md:flex-row justify-between items-center border-b border-gray-700 pb-6">
          <h2 className="text-lg font-semibold text-white">Stay Updated</h2>
          <div className="flex items-center bg-white rounded-full px-4 py-2 w-full md:w-1/3">
            <input
              type="email"
              placeholder="Enter email address"
              className="w-full bg-transparent outline-none text-gray-800"
            />
          
            <MovingBorderDemo 
                        text='SUBSCRIBE'
                        className='text-sm text-white px-4 py-2 rounded-full  font-semibold'
                        containerClassName='h-10 w-32'/>
           
          </div>
        </div>

        {/* Footer  */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mt-8">
          
          {/* Company Info */}
          <div className="col-span-2">
            <h3 className="text-white font-bold">AI MockInterview</h3>
            <p className="mt-2 text-sm">
              Your AI-powered interview preparation platform to practice and improve.
            </p>
            <a href="#" className="text-neutral-300 mt-2 inline-block font-semibold">
              Learn More →
            </a>
          </div>

          {/* Footer Links */}
          {footerLinks.map((section, index) => (
            <div key={index}>
              <h4 className="text-white font-semibold">{section.title}</h4>
              <ul className="mt-2 space-y-2">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <a href="#" className="hover:text-white transition">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* 🔹 Social & Copyright */}
        <div className="mt-8 border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between text-sm">
          <p>© {new Date().getFullYear()} AI MockInterview. All rights reserved.</p>
          <div className="flex space-x-4">
            {["Terms", "Privacy", "Compliances"].map((item, index) => (
              <a key={index} href="#" className="hover:text-white transition">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
