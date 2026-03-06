'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { AudioSearch } from '@/components/audio-search'
import { api } from '@/lib/api'
import { useToast } from '@/hooks/use-toast'
import { Mic } from 'lucide-react'

interface AudioSearchDialogProps {
  trigger?: React.ReactNode
  triggerClassName?: string
}

export function AudioSearchDialog({
  trigger,
  triggerClassName,
}: AudioSearchDialogProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleAudioSearch = async (file: File, language: string) => {
    setLoading(true)
    try {
      const results = await api.search.audio(file, language)

      // Redirect to search page with results stored in sessionStorage
      sessionStorage.setItem('audioSearchResults', JSON.stringify(results))
      sessionStorage.setItem('audioSearchQuery', `Audio: ${file.name}`)

      toast({
        title: 'Tìm kiếm thành công',
        description: `Tìm thấy ${results.length} kết quả`,
      })

      // Close dialog and redirect
      setOpen(false)
      router.push('/tim-kiem?audio=1')
    } catch (error) {
      console.error('Error searching with audio:', error)
      toast({
        title: 'Lỗi tìm kiếm',
        description:
          error instanceof Error
            ? error.message
            : 'Không thể tìm kiếm bằng audio. Vui lòng thử lại.',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="icon" className={triggerClassName}>
            <Mic className="h-4 w-4" />
            <span className="sr-only">Tìm kiếm bằng giọng nói</span>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mic className="h-5 w-5 text-primary" />
            Tìm kiếm bằng giọng nói
          </DialogTitle>
          <DialogDescription>
            Ghi âm hoặc tải file audio lên để tìm kiếm truyện
          </DialogDescription>
        </DialogHeader>
        <AudioSearch onSearch={handleAudioSearch} loading={loading} />
      </DialogContent>
    </Dialog>
  )
}
