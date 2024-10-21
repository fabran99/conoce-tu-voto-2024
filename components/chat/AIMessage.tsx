import ReactMarkdown from "react-markdown";
import { ChatReference } from "@/types/chat";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function AIMessage({
  message,
  isLoading,
  chatReferences,
}: {
  message: string;
  isLoading: boolean;
  chatReferences: ChatReference[];
}) {
  const [referencesOpen, setReferencesOpen] = useState(false);
  return (
    <div className="flex justify-start">
      <div
        className={`max-w-[75%] p-4 rounded-lg bg-gray-100 text-gray-800 ${
          isLoading
            ? "animate-pulse bg-gradient-to-r from-gray-100 to-gray-200"
            : ""
        }`}
      >
        <div>
          {isLoading ? (
            "Generando respuesta..."
          ) : (
            <ReactMarkdown
              components={{
                h1: ({ node, ...props }) => (
                  <h1 className="text-3xl font-bold" {...props}>
                    {props.children}
                  </h1>
                ),
                h2: ({ node, ...props }) => (
                  <h2 className="text-2xl font-bold" {...props}>
                    {props.children}
                  </h2>
                ),
                h3: ({ node, ...props }) => (
                  <h3 className="text-xl font-bold" {...props}>
                    {props.children}
                  </h3>
                ),
                h4: ({ node, ...props }) => (
                  <h4 className="text-l font-bold" {...props}>
                    {props.children}
                  </h4>
                ),
                a: ({ node, ...props }) => (
                  <a
                    className="text-blue-600 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                    {...props}
                  >
                    {props.children}
                  </a>
                ),
                pre: ({ node, ...props }) => (
                  <pre className="overflow-auto whitespace-pre-wrap" {...props}>
                    {props.children}
                  </pre>
                ),
                code: ({ node, ...props }) => (
                  <code className="break-words" {...props}>
                    {props.children}
                  </code>
                ),
                ul: ({ node, ...props }) => (
                  <ul className="ml-4 list-disc" {...props}>
                    {props.children}
                  </ul>
                ),
                ol: ({ node, ...props }) => (
                  <ol className="ml-4 list-decimal" {...props}>
                    {props.children}
                  </ol>
                ),
                li: ({ node, ...props }) => (
                  <li className="ml-4" {...props}>
                    {props.children}
                  </li>
                ),
              }}
            >
              {message}
            </ReactMarkdown>
          )}
          {chatReferences.length > 0 && (
            <div className="references">
              {/* Add a title Referencias with a toggle to hide the references */}
              <div
                className="font-medium py-2 hover:underline block cursor-pointer flex flex-1 items-center justify-between text-lg border-b mt-4"
                onClick={() => setReferencesOpen(!referencesOpen)}
              >
                Referencias: {referencesOpen ? <ChevronUp /> : <ChevronDown />}
              </div>

              {referencesOpen && (
                <>
                  {chatReferences.map((reference, index) => (
                    <a
                      className="text-blue-600 hover:underline block text-sm"
                      key={index}
                      target="_blank"
                      rel="noopener noreferrer"
                      href={`${reference.source}#page=${reference.page}`}
                    >
                      {reference.howToCite}
                    </a>
                  ))}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
