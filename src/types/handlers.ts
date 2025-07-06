export interface FormHandlers{
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  }