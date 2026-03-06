'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Mic, Upload, X, Loader2, AudioLines, FileAudio } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface AudioSearchProps {
  onSearch: (file: File, language: string) => void
  loading?: boolean
}

export function AudioSearch({ onSearch, loading = false }: AudioSearchProps) {
  const [audioFile, setAudioFile] = useState<File | null>(null)
  const [language, setLanguage] = useState<string>('vi')
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const supportedFormats = [
    '.mp3',
    '.wav',
    '.m4a',
    '.ogg',
    '.flac',
    '.webm',
    '.mp4',
  ]

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      chunksRef.current = []

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data)
        }
      }

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' })
        const file = new File([blob], `recording-${Date.now()}.webm`, {
          type: 'audio/webm',
        })
        setAudioFile(file)
        stream.getTracks().forEach((track) => track.stop())
      }

      mediaRecorder.start()
      setIsRecording(true)
      setRecordingTime(0)

      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1)
      }, 1000)
    } catch (error) {
      console.error('Error accessing microphone:', error)
      alert('Không thể truy cập microphone. Vui lòng kiểm tra quyền truy cập.')
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validate file type
      const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase()
      if (!supportedFormats.includes(fileExtension || '')) {
        alert(
          `Định dạng file không được hỗ trợ. Vui lòng chọn file có định dạng: ${supportedFormats.join(', ')}`,
        )
        return
      }
      setAudioFile(file)
    }
  }

  const handleSearch = () => {
    if (audioFile) {
      onSearch(audioFile, language)
    }
  }

  const clearAudioFile = () => {
    setAudioFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-center gap-2">
            <AudioLines className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Tìm kiếm bằng giọng nói</h3>
          </div>

          {/* Language Selector */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Ngôn ngữ</label>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Chọn ngôn ngữ" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="vi">Tiếng Việt</SelectItem>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="zh">中文</SelectItem>
                <SelectItem value="ja">日本語</SelectItem>
                <SelectItem value="ko">한국어</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Recording Controls */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Ghi âm hoặc tải file lên
            </label>
            <div className="flex gap-2">
              {!isRecording ? (
                <>
                  <Button
                    onClick={startRecording}
                    variant="outline"
                    className="flex-1"
                    disabled={loading || !!audioFile}
                  >
                    <Mic className="mr-2 h-4 w-4" />
                    Ghi âm
                  </Button>
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    variant="outline"
                    className="flex-1"
                    disabled={loading || isRecording}
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Tải file lên
                  </Button>
                </>
              ) : (
                <Button
                  onClick={stopRecording}
                  variant="destructive"
                  className="w-full"
                >
                  <Mic className="mr-2 h-4 w-4 animate-pulse" />
                  Dừng ghi âm ({formatTime(recordingTime)})
                </Button>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept={supportedFormats.join(',')}
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          {/* Audio File Display */}
          {audioFile && (
            <div className="rounded-lg border bg-muted/50 p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileAudio className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium">{audioFile.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {(audioFile.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                </div>
                <Button
                  onClick={clearAudioFile}
                  variant="ghost"
                  size="sm"
                  disabled={loading}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              {audioFile.type.startsWith('audio/') && (
                <audio
                  controls
                  src={URL.createObjectURL(audioFile)}
                  className="mt-3 w-full"
                />
              )}
            </div>
          )}

          {/* Search Button */}
          <Button
            onClick={handleSearch}
            className="w-full"
            disabled={!audioFile || loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Đang tìm kiếm...
              </>
            ) : (
              'Tìm kiếm'
            )}
          </Button>

          {/* Supported Formats Info */}
          <p className="text-xs text-muted-foreground">
            Định dạng hỗ trợ: {supportedFormats.join(', ')}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
