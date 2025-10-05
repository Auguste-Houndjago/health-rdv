//src/contexts/react-query-provider
"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function ReactQueryProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        // Temps par défaut avant que les données soient considérées comme stale
        staleTime: 5 * 60 * 1000, // 5 minutes
        // Temps avant que les données inactives soient garbage collected
        gcTime: 10 * 60 * 1000, // 10 minutes
      },
    },
  }
  ));

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
