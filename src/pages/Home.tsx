
import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const FAQ = [
  {
    question: "Moet ik investeren?",
    answer: "Nee, alles gebeurt automatisch.",
  },
  {
    question: "Kan ik zelf investeringen kiezen?",
    answer: "Nee, de IQ Bot doet dit volgens plan.",
  },
  {
    question: "Hoe zie ik mijn cashflow groeien?",
    answer: "Via je persoonlijke Member Dashboard.",
  },
];

export default function Home() {
  const infoRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    infoRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#eef2ff] via-[#fbed96] to-[#fad9c6]">
      {/* Slogan + top actions */}
      <div className="w-full max-w-2xl mx-auto text-center py-16 px-5">
        <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-4">
          Automatische cashflow opbouwen met Investbotiq.
        </h1>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-6 mb-10">
          <Button className="w-72 text-lg py-6" asChild>
            <Link to="/auth">🔵 Inloggen</Link>
          </Button>
          <Button
            className="w-72 text-lg py-6 border border-primary bg-white text-primary hover:bg-primary hover:text-white transition"
            variant="outline"
            onClick={handleScroll}
          >
            ⚪ Bekijk hoe het werkt
          </Button>
        </div>
      </div>

      {/* Info section */}
      <div ref={infoRef} className="mx-auto max-w-2xl w-full rounded-xl shadow-lg bg-white/90 backdrop-blur p-8 mt-0 mb-12">
        {/* Wat is Investbotiq */}
        <h2 className="text-2xl font-bold mb-2">Wat is Investbotiq?</h2>
        <p className="mb-6 text-gray-700">
          Investbotiq is een platform dat automatisch cashflow voor jou genereert met behulp van de IQ Bot. Geen investeringskeuzes, geen financieringsaanvragen, geen technische kennis vereist – alles gebeurt transparant en automatisch.
        </p>

        {/* Waarom investbotiq */}
        <h3 className="text-xl font-semibold mb-1">Waarom Investbotiq?</h3>
        <ul className="mb-6 list-disc list-inside space-y-1 text-gray-700">
          <li>Automatische cashflowgroei, maand na maand</li>
          <li>Geen technische kennis nodig</li>
          <li>Transparante maandelijkse opbouw zichtbaar via je dashboard</li>
          <li>Gestructureerde opbouw via spirits en cashflows</li>
          <li>Geen externe tussenpartijen: alles in eigen beheer via de IQ Bot</li>
        </ul>

        {/* Hoe werkt het */}
        <h3 className="text-xl font-semibold mb-1">Hoe werkt het?</h3>
        <ol className="mb-6 list-decimal list-inside space-y-1 text-gray-700">
          <li>Aanmelden</li>
          <li>De IQ Bot activeert automatisch spirits en cashflows</li>
          <li>Jouw cashflow groeit elke maand zichtbaar op je dashboard</li>
        </ol>

        {/* Voordelen */}
        <h3 className="text-xl font-semibold mb-1">Voordelen:</h3>
        <ul className="mb-6 list-none space-y-1 text-gray-700">
          <li>✔️ Geen minimale investering vereist</li>
          <li>✔️ Transparante maandrapportage in dashboard</li>
          <li>✔️ Non-technical: gebruikers hoeven niets te doen</li>
          <li>✔️ Maandelijkse automatische groei</li>
        </ul>

        {/* FAQ */}
        <div className="mt-10">
          <h3 className="text-xl font-semibold mb-3">Mini FAQ</h3>
          <div className="space-y-4">
            {FAQ.map((f, i) => (
              <div key={i} className="bg-muted rounded-md p-4">
                <p className="font-medium mb-1">{f.question}</p>
                <p className="text-muted-foreground">{f.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-6 mt-auto bg-background border-t text-center text-muted-foreground">
        <div className="flex flex-wrap items-center justify-center gap-6">
          <a href="#" className="underline">Algemene Voorwaarden</a>
          <a href="#" className="underline">Privacybeleid</a>
          <a href="#" className="underline">Contact</a>
        </div>
        <div className="mt-2 text-xs">© {new Date().getFullYear()} Investbotiq</div>
      </footer>
    </div>
  );
}
