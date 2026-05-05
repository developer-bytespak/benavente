export type ActionState =
  | { ok: true; message?: string }
  | { ok: false; message: string }
  | null

export default function SaveStatus({ state }: { state: ActionState }) {
  if (!state) return null
  if (state.ok) {
    return (
      <p className="text-emerald-700 text-[13px] font-serif flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-700" />
        {state.message ?? 'Saved successfully.'}
      </p>
    )
  }
  return (
    <p className="text-red-600 text-[13px] font-serif flex items-center gap-1.5">
      <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
      {state.message}
    </p>
  )
}
