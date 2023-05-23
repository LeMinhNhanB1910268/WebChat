from flask import Flask, request, send_file, jsonify
from gtts import gTTS
from google.cloud import speech_v1p1beta1 as speech
client = speech.SpeechClient.from_service_account_file('silent-rune-380307-ad2bb66463e1.json')
from pydub import AudioSegment
import os
import io
class TranferController:
    def text_to_speech():
        text = request.json['text']
        language = request.json.get('language', 'vi')
        
        tts = gTTS(text=text, lang=language)
        audio_file = 'audio/output.mp3'
        tts.save(audio_file)
        
        return jsonify({"path":"audio/output.mp3"})
    def getAudio():
        file_path = 'audio/output.mp3'  # Đường dẫn tới file âm thanh bạn muốn mở

        audio = AudioSegment.from_file(file_path)  # Đọc file âm thanh

        # Lưu audio tạm thời vào một file cache
        temp_file = 'temp_audio.wav'
        audio.export(temp_file, format='wav')

        return send_file(temp_file, mimetype='audio/wav')
    
    def speech_to_text():
        # Lấy dữ liệu âm thanh từ yêu cầu POST
        audio_file = request.files['audio']
        # Đọc nội dung âm thanh
        audio_content = audio_file.read()
        # Khởi tạo client Speech-to-Text
        # Tạo một yêu cầu nhận dạng giọng nói
        audio = speech.RecognitionAudio(content=audio_content)
        config = speech.RecognitionConfig(
            encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16,
            sample_rate_hertz=16000,
            language_code='vi-VN'
        )

        # Gửi yêu cầu đến Speech-to-Text API
        response = client.recognize(config=config, audio=audio)
        print(response.results)
        # Xử lý kết quả nhận dạng
        text = ""
        for result in response.results:
            text += result.alternatives[0].transcript

        # Trả về kết quả dạng JSON
        return jsonify({'text': text})