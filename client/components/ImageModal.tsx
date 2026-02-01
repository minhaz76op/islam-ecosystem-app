import React from 'react';
import { Modal, StyleSheet, Pressable, Image, View, Dimensions } from 'react-native';
import { BlurView } from 'expo-blur';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../hooks/useTheme';

const { width, height } = Dimensions.get('window');

interface ImageModalProps {
  visible: boolean;
  imageUrl: string | null;
  onClose: () => void;
}

export const ImageModal = ({ visible, imageUrl, onClose }: ImageModalProps) => {
  const { isDark } = useTheme();

  if (!imageUrl) return null;

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.container} onPress={onClose}>
        <BlurView
          intensity={80}
          tint={isDark ? 'dark' : 'light'}
          style={StyleSheet.absoluteFill}
        />
        <View style={styles.content}>
          <Image
            source={{ uri: imageUrl }}
            style={styles.image}
            resizeMode="contain"
          />
          <Pressable style={styles.closeButton} onPress={onClose}>
            <Feather name="x" size={24} color="#FFFFFF" />
          </Pressable>
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  content: {
    width: width * 0.9,
    height: height * 0.7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  closeButton: {
    position: 'absolute',
    top: -40,
    right: 0,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
