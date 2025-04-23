
import React from "react";
import PublicHeader from "@/components/PublicHeader";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";

const FAQ_ITEMS = [
  {
    question: "Kan ik elk moment eruit stappen?",
    answer: "Ja, maar alleen als het account tijdig wordt gesloten."
  },
  {
    question: "Wat gebeurt er met mijn gegevens?",
    answer: "Uw gegevens worden veilig opgeslagen en uitsluitend gebruikt voor uw Bv's."
  },
  {
    question: "Kan ik in de schulden komen?",
    answer: "Technisch gezien niet volgens het protocol, uitgezonderd bij vroegtijdig stoppen zonder verplichtingen af te ronden."
  },
  {
    question: "Hoelang moet ik meedoen om profijt te hebben?",
    answer: "Na maand 1 heeft u al profijt."
  },
  {
    question: "Hoe vaak moet ik er zelf mee bezig zijn?",
    answer: "In de eerste maand het meest, daarna slechts één keer per maand."
  },
  {
    question: "Is het gegarandeerd dat ik eraan verdien?",
    answer: "Als je het volledige protocol opvolgt en afmaakt: JA."
  },
  {
    question: "Komen er extra kosten bij kijken?",
    answer: "Nee, deelname aan Investbotiq brengt geen extra kosten met zich mee."
  },
  {
    question: "Wat gebeurt er met het BEL-lening geld, waar wordt dit in geïnvesteerd?",
    answer: "Al het geld blijft in het interne ecosysteem."
  },
  {
    question: "Wat onderscheidt Investbotiq van andere investeringen/leningen?",
    answer: "Investbotiq maakt gebruik van het time gap profit principe (tijd-kloof profijt)."
  },
  {
    question: "Moet ik zelf investeren?",
    answer: "Nee, alles gebeurt automatisch."
  },
  {
    question: "Kan ik zelf investeringen kiezen?",
    answer: "Nee, de IQ Bot volgt een vast plan."
  },
  {
    question: "Hoe zie ik mijn cashflow groeien?",
    answer: "Via je persoonlijke Member Dashboard."
  }
];

const FAQPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#eef2ff] to-indigo-100">
      <PublicHeader />
      <main className="container mx-auto px-4 pt-28 pb-16">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Veelgestelde Vragen
            </h1>
            <p className="text-lg text-gray-600">
              Vind hieronder snel het antwoord op je vraag over Investbotiq.
            </p>
          </div>
          
          <Accordion type="single" collapsible className="space-y-4">
            {FAQ_ITEMS.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-white/80 backdrop-blur-sm rounded-lg border border-gray-200 shadow-sm"
              >
                <AccordionTrigger className="px-4 py-4 hover:bg-gray-50/50 data-[state=open]:bg-gray-50/50 rounded-lg transition-all">
                  <span className="text-left font-medium text-gray-900">
                    {item.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4 pt-2 text-gray-600">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </main>
    </div>
  );
};

export default FAQPage;
