import Icon from '@/components/admin/ui/Icon'

export default function SignOutButton() {
  return (
    <form action="/admin/logout" method="post" className="shrink-0">
      <button
        type="submit"
        title="Sign out"
        aria-label="Sign out"
        className="w-8 h-8 flex items-center justify-center rounded-[3px] text-white/50 hover:text-gold hover:bg-white/5 transition-colors"
      >
        <Icon name="logout" className="w-[16px] h-[16px]" />
      </button>
    </form>
  )
}
