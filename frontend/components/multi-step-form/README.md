# Multi-Step Form System

A comprehensive multi-step form system built with React Hook Form, Zod validation, and shadcn/ui components.

## Features

- ✅ **4-Step Process**: Basic Information → Case Details → Client Information → Review
- ✅ **Real-time Validation**: Uses Zod schema validation with instant feedback
- ✅ **Progress Tracking**: Visual progress indicator and step navigation
- ✅ **Form Persistence**: Data persists across steps until submission
- ✅ **Responsive Design**: Optimized for desktop and mobile devices
- ✅ **Accessible**: Built with accessibility best practices using shadcn/ui
- ✅ **Type Safety**: Full TypeScript support with type-safe form data

## Usage

### Basic Implementation

```tsx
import { MultiStepForm } from "@/components/multi-step-form";

export default function MyPage() {
  return (
    <div>
      <MultiStepForm />
    </div>
  );
}
```

### Custom Integration

```tsx
import { MultiStepForm, type FormData } from "@/components/multi-step-form";

export default function CaseManagement() {
  const handleFormSubmit = (data: FormData) => {
    // Custom submission logic
    console.log("Form submitted:", data);
  };

  return (
    <div className="container mx-auto">
      <h1>Create New Legal Case</h1>
      <MultiStepForm onSubmit={handleFormSubmit} />
    </div>
  );
}
```

## Form Schema

The form uses a comprehensive Zod schema for validation:

```typescript
const formSchema = z.object({
  // Basic Information
  caseTitle: z.string().min(1, "Case title is required"),
  caseType: z.string().min(1, "Case type is required"),
  priority: z.string().min(1, "Priority is required"),

  // Case Details
  description: z.string().min(10, "Description must be at least 10 characters"),
  jurisdiction: z.string().min(1, "Jurisdiction is required"),
  courtName: z.string().optional(),
  caseNumber: z.string().optional(),

  // Client Information
  clientName: z.string().min(1, "Client name is required"),
  clientEmail: z.string().email("Invalid email address"),
  clientPhone: z.string().min(1, "Phone number is required"),
  clientAddress: z.string().min(1, "Address is required"),

  // Documents
  hasDocuments: z.boolean(),
  documentNotes: z.string().optional(),
});
```

## Step Components

### 1. Basic Information Step

- **Case Title**: Required text input
- **Case Type**: Select dropdown with legal categories
- **Priority**: Radio group with priority levels (Low, Medium, High, Critical)

### 2. Case Details Step

- **Description**: Required textarea for detailed case information
- **Jurisdiction**: Select dropdown with Turkish jurisdictions
- **Court Name**: Optional text input
- **Case Number**: Optional text input

### 3. Client Information Step

- **Client Name**: Required text input
- **Email**: Required email input with validation
- **Phone**: Required tel input
- **Address**: Required textarea

### 4. Review Step

- **Data Review**: Displays all entered information in organized cards
- **Documents**: Checkbox for document attachment
- **Additional Notes**: Optional textarea for extra information

## Validation

- **Step-by-Step Validation**: Each step validates required fields before proceeding
- **Real-time Feedback**: Instant error messages and validation states
- **Final Validation**: Complete form validation on submission

## Customization

### Adding New Steps

1. Create a new step component in `./steps/`
2. Add it to the steps array in `multi-step-form.tsx`
3. Update the form schema and field validation logic

### Modifying Validation

Update the `formSchema` in `multi-step-form.tsx` and corresponding field validation in `getFieldsForStep()`.

### Styling

The form uses Tailwind CSS classes and can be customized by modifying the className props throughout the components.

## Dependencies

- `react-hook-form` - Form state management
- `@hookform/resolvers` - Zod integration
- `zod` - Schema validation
- `shadcn/ui` - UI components
- `lucide-react` - Icons

## File Structure

```
components/multi-step-form/
├── multi-step-form.tsx          # Main form component
├── index.ts                     # Export barrel
├── README.md                    # This documentation
└── steps/
    ├── basic-information-step.tsx
    ├── case-details-step.tsx
    ├── client-information-step.tsx
    └── review-step.tsx
```

## Performance

- **Optimized Re-renders**: Uses React Hook Form's optimized rendering
- **Lazy Validation**: Validates fields only when needed
- **Form Persistence**: Data is maintained in form state across steps

## Accessibility

- **Keyboard Navigation**: Full keyboard support
- **Screen Reader Support**: Proper ARIA labels and descriptions
- **Focus Management**: Logical tab order and focus states
- **Error Announcements**: Clear error messaging for assistive technologies
