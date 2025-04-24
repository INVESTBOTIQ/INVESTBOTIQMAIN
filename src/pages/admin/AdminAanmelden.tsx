import React from "react";

const AdminAanmelden = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Aanmelden (Account aanmaken)</h1>
      <p className="text-muted-foreground mb-8">Hier kun je handmatig een nieuw account aanmaken op basis van binnengekomen leads of andere gegevens.</p>
      {/* TODO: Voeg hier het aanmeldformulier toe voor admins om accounts aan te maken */}
      <div className="border rounded p-6 bg-background text-center text-gray-500">
        <span>Account aanmaakformulier voor admins komt hier.</span>
      </div>
    </div>
  );
};

export default AdminAanmelden;
