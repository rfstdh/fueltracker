# Fuel Tracker

:poland:

Fuel Tracker to projekt zrealizowany w ramach pracy inżynierskiej. Jest to aplikacja mobilna napisana przy pomocy technologii React Native, dzięki czemu działa jednocześnie na urządzeniach z systemem Android oraz iOS. Dodatkowo, aplikacja jest obudowana nakładką Expo, która w znaczący sposób upraszcza implementowanie natywnych elementów, tj. dostęp do kamery, dostęp do systemu plików czy lokalizacji. Dane przechowywane są na urządzeniu za pośrednictwem bazy danych SQLite.

:us:

Fuel Tracker is a project build as a part of Engineer's thesis. It is a mobile app designed with React Native technology thus it works on Android as well as on iOS devices.
Additionally, app is wrapped with Expo package which drastically reduces the complexity of implementing native elements, such as camera access, file system access or localization.
Data is stored on a device with a help of SQLite database.

# Funkcjonalności | Features

## Wykresy | Charts


### Wyświetlanie | Display

:poland:

Główną funkcjonalnością aplikacji jest zestaw wykresów przedstawiających zużycie paliwa na poszczególnych trasach (miasto, trasa, autostrada). Aktualnie wyświetlany wykres można wybrać: są dostępne łącznie 4 różne wykresy (histogram normalny, histogram ważony, wykres punktowy oraz histogram rozkładu błędów). Ich wybór odbywa się przy pomocy ikony wykresu zlokalizowanej w lewej górnej części nagłówka. Użytkownik może również skonfigurować, który wykres ma pojawiać się na górze (przysłaniać inne). Jest to niezwykle przydatne w przypadku, gdy dla róznych rodzajów tras mamy podobne wyniki, a interesujące nas pomiary są przykryte przez inny rodzaj trasy. Sterowanie widocznością poszczególnego rodzaju trasy odbywa się przy pomocy przycisków z nazwami tras (miasto, trasa, autostrada) zlokalizowanymi bezpośrednio nad wykresem.

:us:

The main functionality of this app is a set of charts presenting fuel usage based on certain type of route (city, track, highway). Currently visible chart can be chosen: there is a total of 4 different chart types (normal histogram, weightened histogram, scatter plot and error distribution histogram). They can be switched by using a chart icon located in top left part of the navbar. User can also configure which chart will be the most visible one (will overlap other charts). It is extremely useful when there are similar results for different types of track and the ones we are interested with are covered with the other ones. Controlling visibility of a given track type is done by track-named buttons (city, track, highway) located directly above the chart.

![Obraz5](https://user-images.githubusercontent.com/43353217/152549331-8ead96b4-2796-4c20-bb19-51370218c7e2.png)

### Panel statystyk | Statistics panel

:poland:

Tuż pod wykresami znajduje się panel statystyk, który przedstawia szczegółowe statystyki dotyczące zużycia paliwa na wyznaczonym rodzaju trasy. Podobnie jak w przypadku samych wykresów, panelem również można zarządzać, tj. zmieniać rodzaj trasy, który ma być brany pod uwagę przy wyliczaniu statystyk. Panel informuje użytkownika jakie jest średnie zużycie paliwa, rzeczywiste zużycie, jaka była moda oraz na jakiej trasie i z jakich pomiarów (pomiary z komputera pokładowego lub pomiary rzeczywiste) były obliczane wyniki.
Przełączanie sie pomiędzy wynikami dla pomiarów rzeczywistych oraz z komputera pokładowego odbywa się przy pomocy ikonki ze strzałkami, znajdującej się w prawym górnym rogu panelu. Dodatkowo, obok znajduje się ikona oka, która pozwala na pokazywanie lub ukrywanie pomiarów z tras mieszanych (pomiary mieszane i tak nie są wliczane do statystyk) 
na wykresie.

:us:

There is statistics panel right below the charts which presents detailed statistics about fuel usage on a given track type. Similarly to charts, panel can be managed, ie. track type that is used to calculate statistics can be changed. Panel tells the user about average fuel usage, actual fuel usage, mode, track type and fill type (computer based fills and actual fills) used to calculate results. Switching between computer based and actual results is handled by arrow icon, located in top right corner of the panel. Additionally, there is eye icon nearby, which allows to show or hide mixed track type fills (they are not taken into consideration when calculating statistics anyway) on chart.


![Obraz5](https://user-images.githubusercontent.com/43353217/152549331-8ead96b4-2796-4c20-bb19-51370218c7e2.png)

### Dodawanie pomiarów | Adding fills

:poland:

Dodawanie pomiaru zużycia paliwa odbywa się przy pomocy ikony z plusem zlokalizowanej w prawym górnym rogu nagłówka. Następnie należy wprowadzić dane dotyczące pomiaru. Szczegól nie warto zwrócić uwagę na pole przebieg (jeżeli mamy pomiary, które z jakiegoś powodu uznaliśmy za nieistotne, to i tak warto je wprowadzić, ponieważ pole przebieg jest w późniejszym etapie używane do wyliczania wagi danego pomiaru, tj. odległość od poprzedniego tankowania dzielona przez stałą wartość referencyjną 500 km). Niewprowadzenie takiego pomiaru może skutkować niewłaściwie wyliczoną wagą następnego wprowadzonego pomiaru.

:us:

Adding new fill is handled by plus icon located in top right corner of navbar. Next, fill data has to be entered. It is worth noting that mileage field is very crucial for the calculation system to work correctly (if we have any fills that for some reason we think are irrelevant, it is still a good idea to enter them, since they are later used to calculate weight of a given fill, ie distance from previous filling divided by constant reference value of 500 km). Not entering that fill may result in inappropriate weight assigned to the next entered fill.

![Obraz5](https://user-images.githubusercontent.com/43353217/152549331-8ead96b4-2796-4c20-bb19-51370218c7e2.png)

## Wczytywanie i zapisywanie danych | Loading and saving data

### Wczytywanie danych | Loading data

:poland:

Aplikacja obsługuje wczytywanie plików w formacie CSV, jednak należy zachować określone kryteria:
- pierwsza linijka musi składać się z tytułów kolumn(zużycie rzeczywiste, zużycie CPU, różnica, rodzaj trasy, przebieg, data tankowania, uwagi)
- dane w każdej linijce muszą być w określonej przez podane wyżej kolumny tytułowe kolejności

Aby wczytać dane z pliku CSV, należy przejść do zakładki ustawienia i wybrać przycisk Import. Otworzy się systemowy eksplorator plików. Pliki można również wczytać z Google Drive.

:us:

Application is capable of opening and reading CSV files, but certain criteria must be met:
- first line has to contain column titles (real usage, CPU usage, error, track type, mileage, fill date, comments)
- data in every line has to be in an order, defined in title columns given above

In order to load data from CSV file, you need to click the settings tab and press the Import button. File system explorer will open. Files can also be loaded from Google Drive.

![Obraz5](https://user-images.githubusercontent.com/43353217/152549331-8ead96b4-2796-4c20-bb19-51370218c7e2.png)

### Zapisywanie danych | Saving data

:poland:

Dane są automatycznie zapisywane/nadpisywane po każdej operacji w bazie danych SQLite na urządzeniu. Po ponownym uruchomieniu aplikacji dane te będą wczytane z najnowszej wersji bazy danych. Istnieje również możliwość eksportu do pliku CSV, który można zapisać na urządzeniu lub na Google Drive. Lokalizacja miejsca zapisu pliku na urządzeniu nie jest niestety dowolna (jest to pewne ograniczenie wynikające z używania nakładki Expo). Po wybraniu przycisku Eksportuj, aplikacja utworzy folder o nazwie Wykresy w folderze multimedialnym (zdjęcia, wideo, dźwięki) i zapisze tam plik. Aplikacja umożliwia również udostępnienie pliku za pośrednictwem usług tj. Messenger, SMS, WhatsApp. Służy do tego przycisk Udostępnij, który również znajduje się w zakładce Ustawienia.

:us:

After every operation, data is automatically saved/overwritten to the SQLite database located in the device. After relaunching the app, data will be loaded from the latest version of SQLite database file. There is also a possibility of exporting a CSV file that can be saved on device or at Goggle Drive. Unfortunatelly, save location can not be chosen (it is a certain restriction coming from Expo package). To save a file, you need to hit the Export button and app will create a folder named Charts in device's multimedia folder (photos, videos, tones) and save file there. Application also allows sharing a file, to do so you need to hit Share button at the very same Settings tab and choose a sharing medium, ie Messenger, SMS, WhatsApp.

![Obraz5](https://user-images.githubusercontent.com/43353217/152549331-8ead96b4-2796-4c20-bb19-51370218c7e2.png)

# Jak uruchomić aplikację? | How to run app?

## Uruchamianie w środowisku deweloperskim | Running in dev environment

:poland:

Uruchomienie aplikacji realizowane jest w dwóch krokach: uruchomienie serwera Expo oraz uruchomienie aplikacji.

Aby uruchomić serwer lokalnie, wymagana jest instalacja wszystkich zależności aplikacji. Zależności te znajdują się w pliku package.json i mogą zostać doinstalowane przy pomocy komendy npm install wywołanej bezpośrednio w folderze z projektem. Aby komendy npm były widoczne, niezbędne jest posiadanie na swoim sprzęcie NodeJS. Gdy wszystkie zależności zostaną zainstalowane, pozostaje uruchomić serwer komendą expo start. Po kilkunastu sekundach serwer powinien już działać oraz powinna otworzyć się karta w przeglądarce.

Aby uruchomić aplikację, należy posiadać fizyczne urządzenie z systemem Android/iOS bądź emulator urządzenia (dla urządzeń Android można go utworzyć w Android Studio, dla urządzeń iOS w Xcode). Uruchomienie aplikacji na fizycznym urządzeniu wymaga zainstalowania aplikacji ExpoGo i zeskanowania kodu QR dostępnego na karcie przeglądarki utworzonej wskutek komendy expo start. Uruchomienie na emulatorze również wymaga pobrania aplikacji ExpoGo, a następnie w wierszu poleceń naciśnięcia przycisku a dla wersji Android oraz i dla wersji iOS.

:us:

Running the app requires two steps: running a Expo Server and running the app itself.

In order to run Expo Server locally, every dependency needed for the app to work correctly is required. Those dependencies can be found in package.json file and can be installed by typing npm install directly in project's folder. To use npm commands, you need to have NodeJS installed on your machine. After all the dependencies have been installed, you can run expo start command, which after few seconds should run a Expo Server and also open a browser tab.

In order to run the app, you need to have either physical device with Android/iOS or device emulator (for Android device you can create one in Android Studio and for iOS in Xcode). Running the app on physical device requires installing ExpoGo app and scanning a QR code available on browser tab created by expo start command. Running the app on emulator also requires downloading ExpoGo app and after that pressing a for Android version and i for iOS version in the command line.

## Budowanie aplikacji | Building an app

:poland:

Budowanie aplikacji odbywa się zgodnie z instrukcją zamieszczoną na stronie: https://docs.expo.dev/workflow/publishing/

:us:

To build a production version of the app, follow the instruction: https://docs.expo.dev/workflow/publishing/

# Autorzy | Authors

Marcin Oniszczuk
