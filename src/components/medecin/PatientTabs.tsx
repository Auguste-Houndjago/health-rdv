"use client";
import React, { useState } from "react";
import { TabsReusable } from "@/components/TabsReusable";
import { User, Settings } from "lucide-react";

export default function MedecinsTabs() {
  const [activeTab, setActiveTab] = useState("infos");

  const tabs = [
    {
      value: "infos",
      trigger:"Rendez-vous",
      content: (
        <div>
          <h2 className="font-semibold mb-2">Profil</h2>
          <p>Nom : Auguste</p>
          <p>Email : august@example.com</p>
        </div>
      ),
    },
    {
      value: "parametres",
      trigger:"dd",
      content: (
        <div>
          <h2 className="font-semibold mb-2">Préférences</h2>
          <p>Langue : Français</p>
          <p>Thème : Sombre</p>
        </div>
      ),
    },
  ];

  return (
    <TabsReusable
      tabs={tabs}
      value={activeTab}
      onValueChange={setActiveTab}
      className="w-full max-w-md mx-auto"
      tabsListClassName="grid grid-cols-2 bg-gray-100 rounded-lg"
      tabsTriggerClassName="data-[state=active]:bg-white rounded-md  transition"
      tabsContentClassName="mt-4"
    />
  );
}
