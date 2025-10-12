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

        </div>
      ),
    },
    {
      value: "parametres",
      trigger:"parametres",
      content: (
        <div>
    
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
