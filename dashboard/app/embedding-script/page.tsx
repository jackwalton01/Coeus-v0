"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Check, Copy } from "lucide-react"
import { AppLayout } from "@/components/app-layout"

const EMBEDDING_SCRIPT = `<script>
  document.addEventListener('DOMContentLoaded', function() {
    const script = document.createElement('script');
    // script.src = 'https://d7on86vdidm2.cloudfront.net/chatbot.bundle.js';
    script.src = './chatbot.bundle.js';
    script.async = true;
    script.onload = function() {
      if (window.renderChatBot) {
      window.renderChatBot(
        'chat-container',
        'https://gqizegnlxa2uirll4rw6ceh46m0guwzt.lambda-url.eu-west-2.on.aws/',
        'https://3nb4x7wkfjugrqtkrujlbmujju0fxneq.lambda-url.eu-west-2.on.aws/',
      );
    } else {
      console.error('renderChatBot function is not available.');
    }
    };
    
    document.body.appendChild(script);
  });
</script>`

export default function EmbeddingScriptPage() {
  const [copied, setCopied] = useState(false)

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(EMBEDDING_SCRIPT)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Embedding Script</h2>
        <p className="text-muted-foreground">
          Copy and paste this script into your website to embed the Coeus chatbot.
        </p>

        <Card className="relative">
          <div className="absolute right-2 top-2">
            <Button size="sm" variant="ghost" onClick={handleCopyToClipboard} className="h-8 gap-1">
              {copied ? (
                <>
                  <Check className="h-4 w-4" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  <span>Copy</span>
                </>
              )}
            </Button>
          </div>
          <pre className="overflow-x-auto rounded-lg bg-muted p-6 text-sm">
            <code>{EMBEDDING_SCRIPT}</code>
          </pre>
        </Card>

        <div className="rounded-lg border p-4">
          <h3 className="text-lg font-medium mb-2">Implementation Instructions</h3>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>Copy the script above</li>
            <li>
              Paste it into the <code className="bg-muted px-1 rounded">&lt;head&gt;</code> section of your HTML
            </li>
            <li>
              Add a <code className="bg-muted px-1 rounded">&lt;div id="chat-container"&gt;&lt;/div&gt;</code> element
              where you want the chat widget to appear
            </li>
            <li>
              Ensure the <code className="bg-muted px-1 rounded">chatbot.bundle.js</code> file is accessible at the
              specified path
            </li>
          </ol>
        </div>
      </div>
    </AppLayout>
  )
}

