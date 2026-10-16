// _word_ → italic accent. \n → <br/>. Same convention as the About/Home heroes.
export default function Accent({
  text,
  accentClass = 'italic text-gold',
}: {
  text: string
  accentClass?: string
}) {
  const lines = text.split('\n')
  return (
    <>
      {lines.map((line, lineIdx) => (
        <span key={lineIdx}>
          {line.split(/(_[^_]+_)/g).map((part, partIdx) =>
            part.length > 2 && part.startsWith('_') && part.endsWith('_') ? (
              <span key={partIdx} className={accentClass}>
                {part.slice(1, -1)}
              </span>
            ) : (
              <span key={partIdx}>{part}</span>
            )
          )}
          {lineIdx < lines.length - 1 && <br className="hidden sm:block" />}
          {lineIdx < lines.length - 1 && ' '}
        </span>
      ))}
    </>
  )
}
