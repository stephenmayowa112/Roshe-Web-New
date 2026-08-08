import Image from 'next/image';
import { Mail } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Roshe Studios for general, new business, admin, or IP development enquiries.',
  alternates: { canonical: 'https://roshestudios.co.uk/contact' },
  openGraph: {
    title: 'Contact Us | Roshe Studios',
    description: 'Get in touch with Roshe Studios for general, new business, admin, or IP development enquiries.',
    url: 'https://roshestudios.co.uk/contact',
  },
};

const contacts = [
  {
    title: 'General Enquiries',
    description:
      'For any general enquiries which are not project or recruitment related (such as business-to-business suppliers).',
    email: 'info@roshestudios.co.uk',
  },
  {
    title: 'New Business Enquiries',
    description:
      "If you'd like to talk to us about hiring our services to create an animation we'd love to chat!",
    email: 'omobolaji.moses@roshestudios.co.uk',
  },
  {
    title: 'Admin Enquiries',
    description:
      'Got a question about working at Roshe Studios? Please send your questions to the following email.',
    email: 'helen.moses@roshestudios.co.uk',
  },
];

export default function Contact() {
  return (
    <main className="w-full bg-white flex flex-col items-center pb-24">

      {/* Hero Banner */}
      <section
        className="w-full max-w-7xl mx-auto relative h-[30vh] md:h-[40vh] bg-black flex items-center justify-between px-8 md:px-24 mb-20 overflow-hidden"
        aria-label="Contact Us Header"
      >
        <h1 className="relative z-10 text-white text-3xl md:text-5xl font-medium tracking-wide">
          Get in Touch
        </h1>
        <div className="hidden md:block relative w-48 h-48 lg:w-64 lg:h-64 opacity-80" aria-hidden="true">
          <Image
            src="/images/contactusLogo.png"
            alt="Roshe Studios mascot"
            fill
            sizes="(max-width: 1024px) 192px, 256px"
            className="object-contain"
            priority
          />
        </div>
      </section>

      {/* Contact Cards */}
      <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 mb-20" aria-label="Contact Enquiries">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {contacts.map(({ title, description, email }) => (
            <div
              key={title}
              className="flex flex-col rounded-2xl border border-gray-200 bg-white shadow-sm p-8 gap-4"
            >
              <h2 className="text-lg font-bold text-gray-900">{title}</h2>
              <p className="text-sm text-gray-600 leading-relaxed flex-1">{description}</p>
              <a
                href={`mailto:${email}`}
                className="inline-flex items-center gap-2 text-sm font-medium text-[#f5bf05] hover:underline focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded"
              >
                <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                {email}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* IP Development Notice */}
      <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 mb-20" aria-label="IP Development">
        <div className="rounded-2xl border border-gray-200 bg-[#fffbea] p-8 sm:p-10">
          <h2 className="text-lg font-bold text-gray-900 mb-4">IP Development</h2>
          <p className="text-sm text-gray-700 leading-relaxed mb-4">
            Please be advised that we are not currently accepting unsolicited ideas or pitches (for
            example, pitch documents, scripts or story ideas). For legal reasons, we will not open or
            read any such submissions and any emails that appear to be unsolicited pitches will be
            deleted and will not be read.
          </p>
          <p className="text-sm text-gray-700 leading-relaxed">
            In the future, we may run competitions or workshop schemes to allow submissions or pitches
            to be sent to us (&ldquo;Submission Schemes&rdquo;) and we will post details of any
            upcoming or open Submission Schemes on our website.
          </p>
        </div>
      </section>

      {/* Contact Image + Address */}
      <section
        className="w-full max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center"
        aria-label="Location"
      >
        <div className="flex justify-center md:justify-start">
          <div className="w-full max-w-[450px] aspect-[4/5] relative overflow-hidden shadow-xl rounded-tr-[5rem] rounded-bl-[5rem] rounded-tl-none rounded-br-none">
            <Image
              src="/images/contactusimage.png"
              alt="A warmly lit room representing Roshe Studios workspace"
              fill
              sizes="(max-width: 768px) 100vw, 450px"
              className="object-cover"
            />
          </div>
        </div>
        <address className="text-gray-900 text-lg not-italic">
          <p className="font-bold mb-1">Based in</p>
          <p>Stockport,</p>
          <p>Manchester, UK.</p>
        </address>
      </section>

    </main>
  );
}
