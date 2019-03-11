# PhoneGap Presentation Demo

[Link slides present](https://docs.google.com/presentation/d/1C1k65ehwMvYZcIgEfh77BRu4ED8n0UTgBn_q86qcjxI/edit?usp=sharing)

## Cách chạy app PhoneGap:

1. Mở terminal tại thư mục phonegap

2. Chạy lệnh `phonegap serve`
```
> phonegap serve
[phonegap] starting app server...
[phonegap] listening on 192.168.1.7:3000
[phonegap]
[phonegap] ctrl-c to stop the server
```
Để yên màn hình này trong lúc code, khi save code sẽ tự load change trên điện thoại. Để tắt nhấn Ctrl+C

3. Mở app PhoneGap Developer trên điện thoại, nhập địa chỉ trên vào, bấm Connect

## Cách build PhoneGap ra file apk,...
```
phonegap build android
phonegap build ios
phonegap build wp8
phonegap build blackberry10
```

## Cách build và cài phonegap vào máy thật
```
phonegap run android
phonegap run ios
phonegap run wp8
phonegap run blackberry10
```

## Cách add platform
```
cordova platform add ios
cordova platform add android
```

## Cach kiểm tra các platforms đã cài
```
cordova platform ls
```

## Cách add plugin

Tuỳ vào plugin sẽ có cách cài đặt khác nhau, đa số document sẽ hướng dẫn lệnh cài đặt. Chỉ cần copy vào thôi.

Ví dụ: `cordova plugin add cordova-plugin-camera`

