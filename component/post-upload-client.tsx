'use client'

import { useState } from 'react'
import { Upload, X, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { addPost, getCurrentUser, type Post } from '@/lib/mock-data'

interface PostUploadClientProps {
  onSuccess?: () => void
}

export default function PostUploadClient({ onSuccess }: PostUploadClientProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [preview, setPreview] = useState<string>('')
  const [formData, setFormData] = useState({
    caption: '',
    tags: '',
    style: 'minimalist',
    roomType: 'living room',
    isAIGenerated: false,
  })
  const currentUser = getCurrentUser()

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setPreview(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!currentUser || !preview) return

    const tags = formData.tags
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t)

    addPost({
      userId: currentUser.id,
      userName: currentUser.name,
      userAvatar: currentUser.avatar,
      imageUrl: preview,
      caption: formData.caption,
      tags,
      style: formData.style,
      roomType: formData.roomType,
      isAIGenerated: formData.isAIGenerated,
    })

    setIsOpen(false)
    setPreview('')
    setFormData({
      caption: '',
      tags: '',
      style: 'minimalist',
      roomType: 'living room',
      isAIGenerated: false,
    })

    onSuccess?.()
  }

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 h-14 w-14 rounded-full p-0 shadow-lg hover:scale-110 transition-transform z-40"
      >
        <Plus className="h-6 w-6" />
      </Button>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold">Create a Post</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 hover:bg-muted rounded-lg transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-semibold mb-3">Upload Image</label>
            {preview ? (
              <div className="relative w-full aspect-video rounded-xl overflow-hidden border-2 border-primary/20">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => setPreview('')}
                  className="absolute top-2 right-2 p-2 bg-black/50 text-white rounded-lg hover:bg-black/70"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center w-full aspect-video rounded-xl border-2 border-dashed border-primary/30 hover:border-primary/50 cursor-pointer transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="h-10 w-10 text-primary/50 mb-2" />
                  <p className="text-sm font-medium">Click to upload or drag and drop</p>
                  <p className="text-xs text-muted-foreground">PNG, JPG, GIF up to 10MB</p>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            )}
          </div>

          {/* Caption */}
          <div>
            <label className="block text-sm font-semibold mb-2">Caption</label>
            <textarea
              value={formData.caption}
              onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
              placeholder="Describe your design... Add tips, inspiration, or thoughts!"
              className="w-full p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
              rows={4}
            />
            <p className="text-xs text-muted-foreground mt-1">
              {formData.caption.length} / 280 characters
            </p>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-semibold mb-2">Tags</label>
            <Input
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              placeholder="design, inspiration, modern (comma separated)"
              className="border-border"
            />
            <p className="text-xs text-muted-foreground mt-1">Separate tags with commas</p>
          </div>

          {/* Style & Room Type */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Design Style</label>
              <select
                value={formData.style}
                onChange={(e) => setFormData({ ...formData, style: e.target.value })}
                className="w-full p-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="minimalist">Minimalist</option>
                <option value="industrial">Industrial</option>
                <option value="scandinavian">Scandinavian</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Room Type</label>
              <select
                value={formData.roomType}
                onChange={(e) => setFormData({ ...formData, roomType: e.target.value })}
                className="w-full p-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="living room">Living Room</option>
                <option value="bedroom">Bedroom</option>
                <option value="kitchen">Kitchen</option>
              </select>
            </div>
          </div>

          {/* AI Generated Toggle */}
          <div className="flex items-center gap-3 p-3 bg-primary/5 border border-primary/20 rounded-lg">
            <input
              type="checkbox"
              checked={formData.isAIGenerated}
              onChange={(e) => setFormData({ ...formData, isAIGenerated: e.target.checked })}
              className="w-4 h-4 cursor-pointer"
              id="ai-toggle"
            />
            <label htmlFor="ai-toggle" className="text-sm font-medium cursor-pointer">
              This is an AI-generated design
            </label>
          </div>

          {/* Submit Button */}
          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!preview || !formData.caption.trim()}
              className="flex-1"
            >
              Publish Post
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
