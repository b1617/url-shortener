import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { Copy, Edit3, Plus, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { useCreateShortLinkMutation } from "../../redux/apis/LinkApi";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";

type LinkCreationModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const LinkFormSchema = z.object({
  originalUrl: z.url({
    error: "Please enter a valid URL",
  }),
});

type LinkFormData = z.infer<typeof LinkFormSchema>;

export function LinkCreationModal({ isOpen, onClose }: LinkCreationModalProps) {
  const [shortenUrl, setShortenUrl] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      setShortenUrl(null);
    };
  }, [isOpen]);

  const form = useForm<LinkFormData>({
    resolver: zodResolver(LinkFormSchema),
    defaultValues: {
      originalUrl: "",
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting, isDirty },
  } = form;

  const [createShortLink] = useCreateShortLinkMutation();

  async function onSubmit(data: LinkFormData) {
    try {
      const response = await createShortLink(data).unwrap();
      setShortenUrl(response.shortUrl);
    } catch (error) {
      toast.error("Failed to create short link");
      console.error("Failed to create short link:", error);
    }
  }

  function onCancel() {
    reset();
    onClose();
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="w-4xl max-h-[90vh] overflow-y-auto [&>button]:hidden"
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Edit3 className="w-5 h-5" />
            Shorten a new link
          </DialogTitle>
          <DialogDescription>
            Just fill in the form to create a shortened URL.
          </DialogDescription>
        </DialogHeader>

        <form id="social-post-edit-form" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Controller
              name="originalUrl"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>URL</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="https://example.com/very/long/url"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>
        </form>

        {shortenUrl && (
          <div className="mt-4 p-4 border border-green-300 bg-green-50 rounded">
            Shortened URL created successfully!
            <p className="font-medium text-green-800 mb-2">{shortenUrl}</p>
            <Button
              className="hover:cursor-pointer"
              onClick={() => navigator.clipboard.writeText(shortenUrl)}
            >
              <Copy className="w-4 h-4" />
              Copy
            </Button>
          </div>
        )}

        <DialogFooter className="flex gap-2">
          <Button
            variant="outline"
            className="hover:cursor-pointer"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            <X className="w-4 h-4" />
            Close
          </Button>
          <Button
            type="submit"
            form="social-post-edit-form"
            disabled={isSubmitting || !isDirty}
            className="hover:cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                creating...
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                Create
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
