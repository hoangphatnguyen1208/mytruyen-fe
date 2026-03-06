'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AudioSearchDialog } from '@/components/audio-search-dialog'
import { Mic, Search } from 'lucide-react'
import Link from 'next/link'

export function AudioSearchSection() {
  return (
    <Card className="overflow-hidden border-primary/20 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5">
      <CardContent className="p-6">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Mic className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Tìm kiếm bằng giọng nói</h3>
              <p className="text-sm text-muted-foreground">
                Ghi âm hoặc tải file audio lên để tìm truyện nhanh chóng
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <AudioSearchDialog
              trigger={
                <Button size="lg" className="gap-2">
                  <Mic className="h-4 w-4" />
                  Bắt đầu tìm kiếm
                </Button>
              }
            />
            <Link href="/tim-kiem">
              <Button variant="outline" size="lg" className="gap-2">
                <Search className="h-4 w-4" />
                Tìm kiếm văn bản
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
