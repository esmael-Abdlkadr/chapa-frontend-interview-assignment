import React from "react";

interface NoteInputProps {
  note: string;
  onNoteChange: (note: string) => void;
  maxLength?: number;
}

const NoteInput: React.FC<NoteInputProps> = ({
  note,
  onNoteChange,
  maxLength = 100,
}) => {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-3">
        Add Note (Optional)
      </label>
      <textarea
        value={note}
        onChange={(e) => onNoteChange(e.target.value)}
        maxLength={maxLength}
        className="w-full px-4 py-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#7DC400] focus:border-transparent resize-none transition-all text-base"
        rows={3}
        placeholder="What's this payment for?"
      />
      <p className="mt-2 text-sm text-gray-500">
        {note.length}/{maxLength} characters
      </p>
    </div>
  );
};

export default NoteInput;
