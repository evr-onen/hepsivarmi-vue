export const navMenuItems = [
    {
        label: 'elektronik',
        type: 'side-menu',
        children: [
            {
                label: 'Bilgisayar/Tablet',
                to: '/kategori?category=bilgisayar&category=tablet',
                children: [
                    {
                        label: 'Dizüstü Bilgisayar',
                        to: '/kategori?category=dizustu-bilgisayar',
                        children: [
                            {
                                label: 'Notebook',
                                to: '/kategori?subcategory=notebook',
                            },
                            {
                                label: 'Oyun Bilgisayarları',
                                to: '/kategori?subcategory=oyun-bilgisayarlari',
                            },
                            {
                                label: 'İkisi Bir Arada',
                                to: '/kategori?subcategory=ikisi-bir-arada',
                            }
                        ]
                    },
                    {
                        label: 'Tablet',
                        to: '/kategori?category=tablet',
                        children: [
                            {
                                label: 'Apple',
                                to: '/kategori?category=tablet&brand=apple'
                            },
                            {
                                label: 'Samsung',
                                to: '/kategori?category=tablet&brand=samsung'
                            },
                            {
                                label: 'Lenovo',
                                to: '/kategori?category=tablet&brand=lenovo'
                            },
                            {
                                label: 'Alcatel',
                                to: '/kategori?category=tablet&brand=alcatel'
                            },
                            {
                                label: 'Hometech',
                                to: '/kategori?category=tablet&brand=hometech'
                            },
                            {
                                label: 'Huawei',
                                to: '/kategori?category=tablet&brand=huawei'
                            },
                            {
                                label: 'Reeder',
                                to: '/kategori?category=tablet&brand=reeder'
                            },
                            {
                                label: 'Diğer',
                                to: '/kategori?category=tablet&brand=diger'
                            },
                            {
                                label: 'Casper',
                                to: '/kategori?category=tablet&brand=casper'
                            }
                        ]
                    },
                    {
                        label: 'Masaüstü Bilgisayar',
                        to: '/kategori?category=masaustu-bilgisayar',
                        children: [
                            {
                                label: 'All-in-One',
                                to: '/kategori?subcategory=all-in-one'
                            },
                            {
                                label: 'Masaüstü',
                                to: '/kategori?subcategory=masaustu'
                            },
                            {
                                label: 'Mini Masaüstü',
                                to: '/kategori?subcategory=mini-masaustu'
                            }
                        ]
                    },
                    {
                        label: 'Tüm Bilgisayarlar',
                        to: '/kategori?category=tum-bilgisayarlar'
                    }
                ]
            },
            {
                label: 'Yazıcılar & Projeksiyon',
                to: '/kategori?category=yazicilar-projeksiyon',
                children: [
                    {
                        label: 'Yazıcılar',
                        to: '/kategori?category=yazicilar',
                        children: [
                            {
                                label: 'Tankli Yazıcı',
                                to: '/kategori?subcategory=tankli-yazici'
                            },
                            {
                                label: 'Lazer Yazıcı',
                                to: '/kategori?subcategory=lazer-yazici'
                            },
                            {
                                label: 'Mürekkep Püskürtmeli Yazıcı',
                                to: '/kategori?subcategory=murekkep-puskurtmeli-yazici'
                            },
                            {
                                label: 'Nokta Vuruşlu Yazıcı',
                                to: '/kategori?subcategory=nokta-vuruslu-yazici'
                            },
                            {
                                label: 'Fotoğraf Yazıcısı',
                                to: '/kategori?subcategory=fotograf-yazicisi'
                            },
                            {
                                label: '3D Yazıcı',
                                to: '/kategori?subcategory=3d-yazici'
                            },
                            {
                                label: 'Barkod Yazıcı',
                                to: '/kategori?subcategory=barkod-yazici'
                            },
                            {
                                label: 'Tarayıcı',
                                to: '/kategori?subcategory=tarayici'
                            }
                        ]
                    },
                    {
                        label: 'Projeksiyon Cihazı',
                        to: '/kategori?category=projeksiyon-cihazi',
                        children: [
                            {
                                label: 'Sunum Kumandası',
                                to: '/kategori?subcategory=sunum-kumandasi'
                            },
                            {
                                label: 'Projeksiyon Perdesi',
                                to: '/kategori?subcategory=projeksiyon-perdesi'
                            },
                            {
                                label: 'Askı Aparatı',
                                to: '/kategori?subcategory=aski-aparati'
                            },
                            {
                                label: 'Projeksiyon Lambası',
                                to: '/kategori?subcategory=projeksiyon-lambasi'
                            }
                        ]
                    },
                    {
                        label: 'Projeksiyon Ekipmanları',
                        to: '/kategori?category=projeksiyon-ekipmanlari'
                    },
                    {
                        label: 'Sarf Malzemeleri',
                        to: '/kategori?category=sarf-malzemeleri',
                        children: [
                            {
                                label: 'Toner',
                                to: '/kategori?subcategory=toner'
                            },
                            {
                                label: 'Kartuş',
                                to: '/kategori?subcategory=kartus'
                            },
                            {
                                label: 'Drum',
                                to: '/kategori?subcategory=drum'
                            },
                            {
                                label: 'Şerit',
                                to: '/kategori?subcategory=serit'
                            },
                            {
                                label: 'Yazıcı Kağıdı',
                                to: '/kategori?subcategory=yazici-kagidi'
                            }
                        ]
                    },
                    {
                        label: 'Yurt Dışından',
                        to: '/kategori?subcategory=yurt-disindan'
                    },
                    {
                        label: 'Tüm Kategoriler',
                        to: '/kategori?category=tum-kategoriler'
                    }
                ]
            },
            {
                label: 'Telefon & Telefon Aksesuarları',
                to: '/kategori?category=telefon-aksesuarlari',
                children: [
                    {
                        label: 'Cep Telefonu',
                        to: '/kategori?category=cep-telefonu',
                        children: [
                            {
                                label: 'iPhone iOS Telefonlar',
                                to: '/kategori?subcategory=iphone-ios-telefonlar'
                            },
                            {
                                label: 'Tüm Android Telefonlar',
                                to: '/kategori?subcategory=tum-android-telefonlar'
                            },
                            {
                                label: 'Samsung',
                                to: '/kategori?brand=samsung'
                            },
                            {
                                label: 'Xiaomi',
                                to: '/kategori?brand=xiaomi'
                            },
                            {
                                label: 'Eskiyi Yenile',
                                to: '/kategori?subcategory=eskiyi-yenile'
                            },
                            {
                                label: 'Oppo',
                                to: '/kategori?brand=oppo'
                            },
                            {
                                label: 'Huawei',
                                to: '/kategori?brand=huawei'
                            },
                            {
                                label: 'Reeder',
                                to: '/kategori?brand=reeder'
                            },
                            {
                                label: 'Yenilenmiş Telefonlar',
                                to: '/kategori?subcategory=yenilenmis-telefonlar'
                            },
                            {
                                label: 'TECNO',
                                to: '/kategori?brand=tecno'
                            },
                            {
                                label: 'HONOR',
                                to: '/kategori?brand=honor'
                            },
                            {
                                label: 'POCO',
                                to: '/kategori?brand=poco'
                            },
                            {
                                label: 'Infinix',
                                to: '/kategori?brand=infinix'
                            },
                            {
                                label: 'Realme',
                                to: '/kategori?brand=realme'
                            },
                            {
                                label: 'vivo',
                                to: '/kategori?brand=vivo'
                            },
                            {
                                label: 'Tuşlu Telefonlar',
                                to: '/kategori?subcategory=tuslu-telefonlar'
                            }
                        ]
                    },
                    {
                        label: 'Tüm Cep Telefonu Aksesuarları',
                        to: '/kategori?category=tum-cep-telefonu-aksesuarlari',
                        children: [
                            {
                                label: 'Akıllı Saatler',
                                to: '/kategori?subcategory=akilli-saatler'
                            },
                            {
                                label: 'Akıllı Bileklik',
                                to: '/kategori?subcategory=akilli-bileklik'
                            },
                            {
                                label: 'Powerbank',
                                to: '/kategori?subcategory=powerbank'
                            },
                            {
                                label: 'Bluetooth Kulaklıklar',
                                to: '/kategori?subcategory=bluetooth-kulakliklar'
                            },
                            {
                                label: 'Kılıflar',
                                to: '/kategori?subcategory=kiliflar'
                            },
                            {
                                label: 'Şarj Cihazları',
                                to: '/kategori?subcategory=sarj-cihazlari'
                            },
                            {
                                label: 'Şarj Kabloları',
                                to: '/kategori?subcategory=sarj-kablolari'
                            },
                            {
                                label: 'Araç İçi Telefon Tutucular',
                                to: '/kategori?subcategory=arac-ici-telefon-tutucular'
                            },
                            {
                                label: 'Ekran Koruyucular',
                                to: '/kategori?subcategory=ekran-koruyucular'
                            },
                            {
                                label: 'Telefon Kulaklıkları',
                                to: '/kategori?subcategory=telefon-kulakliklar'
                            },
                            {
                                label: 'Taşınabilir Hoparlörler',
                                to: '/kategori?subcategory=tasinabilir-hoparlorler'
                            },
                            {
                                label: 'Telefon Oyun Aksesuarları',
                                to: '/kategori?subcategory=telefon-oyun-aksesuarlari'
                            },
                            {
                                label: 'Selfie (Özçekim) Çubukları',
                                to: '/kategori?subcategory=selfie-ozcekim-cubuklari'
                            },
                            {
                                label: 'Taşıma Kılıfları',
                                to: '/kategori?subcategory=tasima-kiliflari'
                            },
                            {
                                label: 'Sanal Gerçeklik Gözlüğü',
                                to: '/kategori?subcategory=sanal-gerceklik-gozlugu'
                            },
                            {
                                label: 'Bluetooth Araç Kitleri',
                                to: '/kategori?subcategory=bluetooth-arac-kitleri'
                            },
                            {
                                label: 'Akıllı Saat ve Bileklik Aksesuarları',
                                to: '/kategori?subcategory=akilli-saat-bileklik-aksesuarlari'
                            },
                            {
                                label: 'Bluetooth Kulaklık Aksesuarları',
                                to: '/kategori?subcategory=bluetooth-kulaklik-aksesuarlari'
                            },
                            {
                                label: 'Cep Telefonu Yedek Parçaları ve Bataryalar',
                                to: '/kategori?subcategory=cep-telefonu-yedek-parcalari-bataryalar'
                            },
                            {
                                label: 'Diğer Telefon Aksesuarları',
                                to: '/kategori?subcategory=diger-telefon-aksesuarlari'
                            },
                            {
                                label: 'GPS Takip Cihazları',
                                to: '/kategori?subcategory=gps-takip-cihazlari'
                            }
                        ]
                    },
                    {
                        label: 'Akıllı Saatler',
                        to: '/kategori?category=akilli-saatler',
                        children: [
                            {
                                label: 'Akıllı Saatler',
                                to: '/kategori?subcategory=akilli-saatler'
                            },
                            {
                                label: 'Akıllı Çocuk Saatleri',
                                to: '/kategori?subcategory=akilli-cocuk-saatleri'
                            },
                            {
                                label: 'Kordonlar ve Aksesuarlar',
                                to: '/kategori?subcategory=kordonlar-aksesuarlar'
                            }
                        ]
                    },
                    {
                        label: 'Akıllı Bileklikler',
                        to: '/kategori?category=akilli-bileklikler'
                    },
                    {
                        label: 'Powerbank',
                        to: '/kategori?category=powerbank'
                    },
                    {
                        label: 'Bluetooth Kulaklık',
                        to: '/kategori?category=bluetooth-kulaklik'
                    },
                    {
                        label: 'Kılıflar',
                        to: '/kategori?category=kiliflar',
                        children: [
                            {
                                label: 'Koruyucu Kılıflar',
                                to: '/kategori?subcategory=koruyucu-kiliflar'
                            },
                            {
                                label: 'Tasarım Kılıfları',
                                to: '/kategori?subcategory=tasarim-kiliflari'
                            }
                        ]
                    },
                    {
                        label: 'Ekran Koruyucular',
                        to: '/kategori?category=ekran-koruyucular'
                    },
                    {
                        label: 'Şarj Cihazları',
                        to: '/kategori?category=sarj-cihazlari'
                    },
                    {
                        label: 'Şarj Kabloları',
                        to: '/kategori?category=sarj-kablolari'
                    },
                    {
                        label: 'Taşınabilir Hoparlörler',
                        to: '/kategori?category=tasinabilir-hoparlorler'
                    },
                    {
                        label: 'Araç İçi Telefon Tutucular ve Araç Şarj Cihazları',
                        to: '/kategori?category=arac-ici-telefon-tutucular-sarj-cihazlari',
                        children: [
                            {
                                label: 'Araç İçi Telefon Tutucular',
                                to: '/kategori?subcategory=arac-ici-telefon-tutucular'
                            },
                            {
                                label: 'Araç Şarj Cihazları',
                                to: '/kategori?subcategory=arac-sarj-cihazlari'
                            }
                        ]
                    },
                    {
                        label: 'Selfie Çubukları',
                        to: '/kategori?category=selfie-cubuklari'
                    },
                    {
                        label: 'Telefon Oyun Aksesuarları ve Sanal Gerçeklik Gözlükleri',
                        to: '/kategori?category=telefon-oyun-aksesuarlari-sanal-gerceklik-gozlukleri',
                        children: [
                            {
                                label: 'Telefon Oyun Aksesuarları',
                                to: '/kategori?subcategory=telefon-oyun-aksesuarlari'
                            },
                            {
                                label: 'Sanal Gerçeklik Gözlükleri',
                                to: '/kategori?subcategory=sanal-gerceklik-gozlukleri'
                            }
                        ]
                    },
                    {
                        label: 'Telsiz ve Masaüstü Telefonlar',
                        to: '/kategori?category=telsiz-masaustu-telefonlar'
                    },
                    {
                        label: 'Yurt Dışından',
                        to: '/kategori?subcategory=yurt-disindan'
                    }
                ]
            },
            {
                label: 'TV, Görüntü & Ses Sistemleri',
                to: '/kategori?category=tv-goruntu-ses',
                children: [
                    {
                        label: 'Televizyon',
                        to: '/kategori?category=televizyon',
                        children: [
                            {
                                label: 'Samsung',
                                to: '/kategori?brand=samsung'
                            },
                            {
                                label: 'LG',
                                to: '/kategori?brand=lg'
                            },
                            {
                                label: 'Vestel',
                                to: '/kategori?brand=vestel'
                            },
                            {
                                label: 'Philips',
                                to: '/kategori?brand=philips'
                            },
                            {
                                label: 'Grundig',
                                to: '/kategori?brand=grundig'
                            },
                            {
                                label: 'Toshiba',
                                to: '/kategori?brand=toshiba'
                            },
                            {
                                label: 'TCL',
                                to: '/kategori?brand=tcl'
                            }
                        ]
                    },
                    {
                        label: 'Ev Sinema Sistemleri',
                        to: '/kategori?category=ev-sinema-sistemleri',
                        children: [
                            {
                                label: 'Samsung',
                                to: '/kategori?brand=samsung'
                            },
                            {
                                label: 'LG',
                                to: '/kategori?brand=lg'
                            },
                            {
                                label: 'Harman Kardon',
                                to: '/kategori?brand=harman-kardon'
                            },
                            {
                                label: 'Bose',
                                to: '/kategori?brand=bose'
                            },
                            {
                                label: 'Grundig',
                                to: '/kategori?brand=grundig'
                            },
                            {
                                label: 'Pioneer',
                                to: '/kategori?brand=pioneer'
                            },
                            {
                                label: 'Philips',
                                to: '/kategori?brand=philips'
                            },
                            {
                                label: 'Yamaha',
                                to: '/kategori?brand=yamaha'
                            },
                            {
                                label: 'TCL',
                                to: '/kategori?brand=tcl'
                            },
                            {
                                label: 'Xiaomi',
                                to: '/kategori?brand=xiaomi'
                            },
                            {
                                label: 'JBL',
                                to: '/kategori?brand=jbl'
                            },
                            {
                                label: 'Denon',
                                to: '/kategori?brand=denon'
                            }
                        ]
                    },
                    {
                        label: 'Bluetooth Hoparlör',
                        to: '/kategori?category=bluetooth-hoparler',
                        children: [
                            {
                                label: 'JBL',
                                to: '/kategori?brand=jbl'
                            },
                            {
                                label: 'Harman Kardon',
                                to: '/kategori?brand=harman-kardon'
                            },
                            {
                                label: 'Philips',
                                to: '/kategori?brand=philips'
                            },
                            {
                                label: 'Bose',
                                to: '/kategori?brand=bose'
                            },
                            {
                                label: 'Mikado',
                                to: '/kategori?brand=mikado'
                            },
                            {
                                label: 'Yamaha',
                                to: '/kategori?brand=yamaha'
                            },
                            {
                                label: 'Denon',
                                to: '/kategori?brand=denon'
                            },
                            {
                                label: 'Bang&Olufsen',
                                to: '/kategori?brand=bang-olufsen'
                            },
                            {
                                label: 'LG',
                                to: '/kategori?brand=lg'
                            },
                            {
                                label: 'Anker',
                                to: '/kategori?brand=anker'
                            },
                            {
                                label: 'Xiaomi',
                                to: '/kategori?brand=xiaomi'
                            },
                            {
                                label: 'Grundig',
                                to: '/kategori?brand=grundig'
                            },
                            {
                                label: 'Sony',
                                to: '/kategori?brand=sony'
                            },
                            {
                                label: 'Huawei',
                                to: '/kategori?brand=huawei'
                            },
                            {
                                label: 'Marshall',
                                to: '/kategori?brand=marshall'
                            }
                        ]
                    },
                    {
                        label: 'Müzik Sistemleri',
                        to: '/kategori?category=muzik-sistemleri',
                        children: [
                            {
                                label: 'Alarm Saatli Radyolar',
                                to: '/kategori?subcategory=alarm-saatli-radyolar'
                            },
                            {
                                label: 'Portatif Sistemler',
                                to: '/kategori?subcategory=portatif-sistemler'
                            },
                            {
                                label: 'Müzik Seti',
                                to: '/kategori?subcategory=muzik-seti'
                            }
                        ]
                    },
                    {
                        label: 'Projeksiyon Sistemleri',
                        to: '/kategori?category=projeksiyon-sistemleri',
                        children: [
                            {
                                label: 'Projeksiyon Cihazları',
                                to: '/kategori?subcategory=projeksiyon-cihazlari'
                            },
                            {
                                label: 'Projeksiyon Lambaları',
                                to: '/kategori?subcategory=projeksiyon-lambalari'
                            },
                            {
                                label: 'Projeksiyon Perdeleri',
                                to: '/kategori?subcategory=projeksiyon-perdeleri'
                            },
                            {
                                label: 'Sunum Kumandaları',
                                to: '/kategori?subcategory=sunum-kumandalari'
                            }
                        ]
                    },
                    {
                        label: 'Yurt Dışından',
                        to: '/kategori?subcategory=yurt-disindan'
                    },
                    {
                        label: 'Uydu Alıcıları',
                        to: '/kategori?category=uydu-alicilari',
                        children: [
                            {
                                label: 'Next',
                                to: '/kategori?brand=next'
                            },
                            {
                                label: 'Dreamstar',
                                to: '/kategori?brand=dreamstar'
                            },
                            {
                                label: 'Hiremco',
                                to: '/kategori?brand=hiremco'
                            },
                            {
                                label: 'Redline',
                                to: '/kategori?brand=redline'
                            },
                            {
                                label: 'Sun Plus',
                                to: '/kategori?brand=sun-plus'
                            },
                            {
                                label: 'Hi-Tech',
                                to: '/kategori?brand=hi-tech'
                            },
                            {
                                label: 'Botech',
                                to: '/kategori?brand=botech'
                            },
                            {
                                label: 'Goldmaster',
                                to: '/kategori?brand=goldmaster'
                            }
                        ]
                    },
                    {
                        label: 'Blu-Ray ve DVD Oynatıcılar',
                        to: '/kategori?category=blu-ray-dvd-oynaticilar',
                        children: [
                            {
                                label: 'Samsung',
                                to: '/kategori?brand=samsung'
                            },
                            {
                                label: 'Sony',
                                to: '/kategori?brand=sony'
                            },
                            {
                                label: 'Philips',
                                to: '/kategori?brand=philips'
                            },
                            {
                                label: 'Goldmaster',
                                to: '/kategori?brand=goldmaster'
                            }
                        ]
                    },
                    {
                        label: 'Kablo & Soketler',
                        to: '/kategori?category=kablo-soketler',
                        children: [
                            {
                                label: 'HDMI Kablo',
                                to: '/kategori?subcategory=hdmi-kablo'
                            },
                            {
                                label: 'Ses Kabloları',
                                to: '/kategori?subcategory=ses-kablolari'
                            },
                            {
                                label: 'Uzatıcı Çoklayıcılar',
                                to: '/kategori?subcategory=uzatici-coklayi'
                            },
                            {
                                label: 'Dönüştürücüler',
                                to: '/kategori?subcategory=donusturuculer'
                            },
                            {
                                label: 'Kablosuz Ses Görüntü Aktarıcı',
                                to: '/kategori?subcategory=kablosuz-ses-goruntu-aktarici'
                            }
                        ]
                    },
                    {
                        label: 'TV Aksesuarları',
                        to: '/kategori?category=tv-aksesuarlari',
                        children: [
                            {
                                label: 'TV Askı Aparatları',
                                to: '/kategori?subcategory=tv-aski-aparatlari'
                            },
                            {
                                label: 'Akım Korumalı Priz',
                                to: '/kategori?subcategory=akim-korumali-priz'
                            },
                            {
                                label: '3D Gözlükler',
                                to: '/kategori?subcategory=3d-gozlukler'
                            },
                            {
                                label: 'TV Ekran Koruyucuları',
                                to: '/kategori?subcategory=tv-ekran-koruyuculari'
                            }
                        ]
                    },
                    {
                        label: 'Güvenlik Sistemleri',
                        to: '/kategori?category=guvenlik-sistemleri',
                        children: [
                            {
                                label: 'Kamera Sistemi',
                                to: '/kategori?subcategory=kamera-sistemi'
                            },
                            {
                                label: 'Güvenlik Kamerası',
                                to: '/kategori?subcategory=guvenlik-kamerasi'
                            },
                            {
                                label: 'DVR Kayıt Cihazı',
                                to: '/kategori?subcategory=dvr-kayit-cihazi'
                            },
                            {
                                label: 'Alarm Sistemleri',
                                to: '/kategori?subcategory=alarm-sistemleri'
                            }
                        ]
                    },
                    {
                        label: 'Media Player',
                        to: '/kategori?category=media-player',
                        children: [
                            {
                                label: 'Xiaomi',
                                to: '/kategori?brand=xiaomi'
                            },
                            {
                                label: 'Google',
                                to: '/kategori?brand=google'
                            },
                            {
                                label: 'Apple',
                                to: '/kategori?brand=apple'
                            },
                            {
                                label: 'Next',
                                to: '/kategori?brand=next'
                            },
                            {
                                label: 'Mecool',
                                to: '/kategori?brand=mecool'
                            },
                            {
                                label: 'Dreamstar',
                                to: '/kategori?brand=dreamstar'
                            },
                            {
                                label: 'Homatics',
                                to: '/kategori?brand=homatics'
                            },
                            {
                                label: 'Redline',
                                to: '/kategori?brand=redline'
                            },
                            {
                                label: 'Hiremco',
                                to: '/kategori?brand=hiremco'
                            },
                            {
                                label: 'Hakapro',
                                to: '/kategori?brand=hakapro'
                            },
                            {
                                label: 'Botech',
                                to: '/kategori?brand=botech'
                            }
                        ]
                    },
                    {
                        label: 'Kablosuz Ses ve Görüntü Aktarıcı',
                        to: '/kategori?category=kablosuz-ses-goruntu-aktarici'
                    },
                    {
                        label: 'Tüm Kategoriler',
                        to: '/kategori?category=tum-kategoriler'
                    }
                ]
            },
            {
                label: 'Beyaz Eşya',
                to: '/kategori?category=beyaz-esya',
                children: [
                    {
                        label: 'Klavye & Mouse Set',
                        to: '/kategori?subcategory=klavye-mouse-set'
                    },
                    {
                        label: 'Mouse',
                        to: '/kategori?subcategory=mouse'
                    },
                    {
                        label: 'Klavye',
                        to: '/kategori?subcategory=klavye'
                    },
                    {
                        label: 'Monitör',
                        to: '/kategori?subcategory=monitor'
                    },
                    {
                        label: 'Yazıcı',
                        to: '/kategori?subcategory=yazici'
                    },
                    {
                        label: 'Simülasyon Aksesuarları & Sanal Gerçeklik Gözlüğü',
                        to: '/kategori?subcategory=simulasyon-vr'
                    }
                ]
            },
            {
                label: 'Klima ve Isıtıcılar',
                to: '/kategori?category=klima-isiticilar',
                children: [
                    {
                        label: 'Antivirüs ve Güvenlik',
                        to: '/kategori?subcategory=antivirus-guvenlik'
                    },
                    {
                        label: 'Office Yazılımları',
                        to: '/kategori?subcategory=office-yazilimlari'
                    }
                ]
            },
            {
                label: 'Elektrikli Ev Aletleri',
                to: '/kategori?category=elektrikli-ev-aletleri',
                children: [
                    {
                        label: 'Notebook Çantaları',
                        to: '/kategori?subcategory=notebook-cantalari'
                    },
                    {
                        label: 'Tablet ve iPad Aksesuarları',
                        to: '/kategori?subcategory=tablet-ipad-aksesuarlari'
                    },
                    {
                        label: 'Kablolar/Switch ve Çoklayıcılar',
                        to: '/kategori?subcategory=kablolar-switch-coklayi'
                    }
                ]
            },
            {
                label: 'Foto & Kamera',
                to: '/kategori?category=foto-kamera',
                children: [
                    {
                        label: 'Logitech',
                        to: '/kategori?brand=logitech'
                    },
                    {
                        label: 'Steelseries',
                        to: '/kategori?brand=steelseries'
                    },
                    {
                        label: 'Gamepower',
                        to: '/kategori?brand=gamepower'
                    },
                    {
                        label: 'JBL',
                        to: '/kategori?brand=jbl'
                    },
                    {
                        label: 'Sony',
                        to: '/kategori?brand=sony'
                    },
                    {
                        label: 'HyperX',
                        to: '/kategori?brand=hyperx'
                    },
                    {
                        label: 'James Donkey',
                        to: '/kategori?brand=james-donkey'
                    },
                    {
                        label: 'Rampage',
                        to: '/kategori?brand=rampage'
                    },
                    {
                        label: 'Philips',
                        to: '/kategori?brand=philips'
                    },
                    {
                        label: 'Asus',
                        to: '/kategori?brand=asus'
                    },
                    {
                        label: 'Corsair',
                        to: '/kategori?brand=corsair'
                    },
                    {
                        label: 'razer',
                        to: '/kategori?brand=razer'
                    },
                    {
                        label: 'HP',
                        to: '/kategori?brand=hp'
                    }
                ]
            },
            {
                label: 'Oyun & Oyun Konsolları',
                to: '/kategori?category=oyun-konsollar'
            }
        ]
    },
    {
        label: 'Moda',
        type: 'list-menu',
        children: [
            {
                label: 'Home',
                to: '/'
            },
            
        ]
    },
    {
        label: 'Ev, yasam, kirtasite, ofis',
    }
]