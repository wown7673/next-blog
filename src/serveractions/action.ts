import fs from 'fs';
import SFTPClient from 'ssh2-sftp-client';

export default async function fileDownload() {
  const sftp = new SFTPClient();

  // SFTP 서버 접속 정보
  const config = {
    host: process.env.SFTP_HOST || 'localhost',
    port: Number(process.env.SFTP_PORT) || 22,
    username: process.env.SFTP_USERNAME || 'user',
    password: process.env.SFTP_PASSWORD || 'password',
    privateKey: fs.readFileSync('C:/Users/jjj/.ssh/id_rsa'),
  };

  // SFTP 서버 연결
  await sftp.connect(config);

  // 파일경로 설정
  const remoteFilePath = '/home/jjj/contents/어벤져스.mp4'; // SFTP서버의 파일 경로
  const localFilePath = 'C:/Users/jjj/Downloads/어벤져스.mp4'; // 서버에서 가져온 파일을 로컬로 저장할 경로

  // SFTP에서 파일 다운로드( 로컬경로로 저장 )
  await sftp.fastGet(remoteFilePath, localFilePath);

  // 파일 가져오기 완료후 응답
  // res.status(200).json({message:"파일 다운로드 성공"});

  // res.status(500).json({message:"파일 다운로드 실패", error:err});

  // SFTP 연결 해제
  await sftp.end();
}
