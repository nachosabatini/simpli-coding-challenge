import { Schema, model, Document } from 'mongoose';

interface LeadDocument extends Document {
  name: string;
  email: string;
  phone: string;
  product: string;
}

const leadSchema = new Schema<LeadDocument>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  product: {
    type: String,
    required: true,
  },
});

const Lead = model<LeadDocument>('Lead', leadSchema);

export default Lead;
