# ruuvi_weather_geocache
Ruuvitag firmware that can be used to create a geocache that gives coordinates basing on the RuuviTag's weather sensors

Get the Ruuvitag official firmware from here: https://github.com/ruuvi/ruuvitag_fw

Clone this repository under ruuvi_examples and you should be good to go. Tested to work with version d34780c3112d6ac47227a359a940aa3276f8cccf

Here is quick tour how you can build the fw (assumes that you got everything installed to build ruuvitag_fw:

cd /path/to/ruuvitag_fw/ 
make

nrfutil pkg generate --debug-mode --application ruuvi_examples/weather_geocache/ruuvitag_b3/s132/armgcc/_build/weather_geocache.hex --key-file keys/ruuvi_open_private.pem app_dfu_package.zip

Then upload the dfu zip to your ruuvitag using nRF Toolbox
