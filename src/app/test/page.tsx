"use client";

import { useState, useTransition } from "react";
import { sendPlainEmail } from "@/services/notifications";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Send, CheckCircle, AlertCircle } from "lucide-react";

export default function TestEmailPage() {
  const [pending, startTransition] = useTransition();
  const [email, setEmail] = useState("ogwoprecious21@gmail.com");
  const [subject, setSubject] = useState("Notification de test");
  const [message, setMessage] = useState("Salut Auguste 👋 Ceci est un email envoyé via Resend !");
  const [lastResult, setLastResult] = useState<{ success: boolean; data?: any; error?: any } | null>(null);

  const handleSend = () => {
    if (!email || !subject || !message) {
      toast.error("Veuillez remplir tous les champs");
      return;
    }

    console.log('\n🔵 [CLIENT] Début envoi email...');
    console.log('📧 Destinataire:', email);
    console.log('📝 Sujet:', subject);

    startTransition(async () => {
      setLastResult(null);
      
      console.log('⏳ [CLIENT] Appel de sendPlainEmail()...');
      const result = await sendPlainEmail(email, subject, message);

      console.log('📊 [CLIENT] Résultat reçu:', result);
      setLastResult(result);

      if (result.success) {
        toast.success("Email envoyé avec succès !");
        console.log("✅ [CLIENT] Email envoyé avec succès");
        console.log("🆔 [CLIENT] Data:", result.data);
      } else {
        toast.error("Erreur lors de l'envoi");
        console.error("❌ [CLIENT] Erreur:", result.error);
      }
    });
  };

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Mail className="h-6 w-6 text-primary" />
            <CardTitle>Test d'envoi d'email</CardTitle>
          </div>
          <CardDescription>
            Utilise le service de notifications modulaire pour envoyer un email de test
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Destinataire</Label>
            <Input
              id="email"
              type="email"
              placeholder="piratestuart@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={pending}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject">Sujet</Label>
            <Input
              id="subject"
              placeholder="Sujet de l'email"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              disabled={pending}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              placeholder="Contenu du message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={pending}
              rows={6}
            />
          </div>

          <Button
            onClick={handleSend}
            disabled={pending}
            className="w-full"
          >
            {pending ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                Envoi en cours...
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Envoyer l'email
              </>
            )}
          </Button>

          {lastResult && (
            <div className={`p-4 rounded-lg border ${
              lastResult.success 
                ? 'bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800' 
                : 'bg-red-50 border-red-200 dark:bg-red-950 dark:border-red-800'
            }`}>
              <div className="flex items-start gap-2">
                {lastResult.success ? (
                  <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5" />
                )}
                <div className="flex-1">
                  <p className={`font-medium ${
                    lastResult.success 
                      ? 'text-green-900 dark:text-green-100' 
                      : 'text-red-900 dark:text-red-100'
                  }`}>
                    {lastResult.success ? "Email envoyé avec succès !" : "Erreur lors de l'envoi"}
                  </p>
                  {lastResult.success && lastResult.data?.data?.id && (
                    <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                      ID: {lastResult.data.data.id}
                    </p>
                  )}
                  {!lastResult.success && lastResult.error && (
                    <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                      {JSON.stringify(lastResult.error, null, 2)}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="p-4 bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-lg mt-6">
            <h3 className="font-medium text-yellow-900 dark:text-yellow-100 mb-2 flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              ⚠️ Où voir les logs ?
            </h3>
            <div className="text-sm text-yellow-800 dark:text-yellow-200 space-y-2">
              <p><strong>🔵 Logs CLIENT</strong> : Console du navigateur (F12 → Console)</p>
              <p><strong>📤 Logs SERVEUR</strong> : Terminal où tourne <code className="bg-yellow-100 dark:bg-yellow-900 px-1 rounded">npm run dev</code></p>
              <p className="text-xs pt-2 border-t border-yellow-300 dark:border-yellow-700">
                💡 Les logs détaillés (avec emojis 📧 ✅ ❌) sont dans le <strong>TERMINAL</strong>, pas dans le navigateur !
              </p>
            </div>
          </div>

          <div className="text-xs text-muted-foreground space-y-1 pt-4 border-t mt-4">
            <p>📧 Service: Resend</p>
            <p>🔧 API Key: {process.env.NEXT_PUBLIC_RESEND_CONFIGURED ? "Configurée ✅" : "À configurer ⚠️"}</p>
            <p>📝 Type: Email texte brut</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
