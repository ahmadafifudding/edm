import { View, Image, StyleSheet, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ImagePlaceholder } from '@/components/ImagePlaceholder'
import * as ImagePicker from 'expo-image-picker'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/Button'

interface DefectMonitoringImageProps {
  onUpload: (path: string) => void
  url: string | null
}

export function DefectMonitoringImage({
  onUpload,
  url,
}: DefectMonitoringImageProps) {
  const [uploading, setUploading] = useState(false)
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)

  useEffect(() => {
    if (url) downloadImage(url)
  }, [url])

  async function downloadImage(path: string) {
    try {
      const { data, error } = await supabase.storage
        .from('defect-monitoring-images')
        .download(path)

      if (error) {
        throw error
      }

      const fr = new FileReader()
      fr.readAsDataURL(data)
      fr.onload = () => {
        setAvatarUrl(fr.result as string)
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message)
      }
    }
  }

  async function uploadAvatar() {
    try {
      setUploading(true)

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 1,
      })

      if (result.canceled || !result.assets || result.assets.length === 0) {
        return
      }

      const image = result.assets[0]

      if (!image.uri) {
        throw new Error('No image uri!')
      }

      const arraybuffer = await fetch(image.uri).then(res => res.arrayBuffer())

      const fileExt = image.uri?.split('.').pop()?.toLowerCase() ?? 'jpeg'
      const path = `${Date.now()}.${fileExt}`
      const { data, error: uploadError } = await supabase.storage
        .from('defect-monitoring-images')
        .upload(path, arraybuffer, {
          contentType: image.mimeType ?? 'image/jpeg',
        })

      if (uploadError) {
        throw uploadError
      }
      onUpload(data.path)
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message)
      } else {
        throw error
      }
    } finally {
      setUploading(false)
    }
  }
  return (
    <View>
      {avatarUrl ? (
        <Image
          source={{ uri: avatarUrl }}
          height={150}
          resizeMode='cover'
          style={{ borderRadius: 8 }}
        />
      ) : (
        <ImagePlaceholder />
      )}
      <Button
        label={uploading ? 'Uploading...' : 'Upload Image'}
        variant='secondary'
        style={{ marginTop: 10 }}
        onPress={uploadAvatar}
        disabled={uploading}
      />
    </View>
  )
}
