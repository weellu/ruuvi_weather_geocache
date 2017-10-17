# ruuvi_weather_geocache
Ruuvitag firmware that can be used to create a geocache that gives coordinates basing on the RuuviTag's weather sensors

Get the Ruuvitag official firmware from here: https://github.com/ruuvi/ruuvitag_fw

Clone this repository under ruuvi_examples and you should be good to go. Tested to work with version d34780c3112d6ac47227a359a940aa3276f8cccf

As the software and webpages are designed to use goo.gl short URLs, there is not enough room to accommodate all sensor data produced by Ruuvitag. Thus, we only show temperature and humidity on example webpage. Therefore, you might want to edit encodeToUrlDataFormat function in sensortag.c accordingly. Here is an example, how it could look:

void encodeToUrlDataFormat(char* url, uint8_t base_length, ruuvi_sensor_t* data)
{
    //serialize values into a string
    char pack[3] = {0};

    // We are packing only humidity and temperature to the URL. Second byte for temperature
    // would not be required because we could add zero on the receiving end, but air pressure
    // would need two bytes anyway, so just encoding humidity and temp as two bytes to avoid
    // changes to receiving end code.
    uint8_t humidity = data->humidity / 4; //Round to 2 %
    pack[0] = humidity * 4;
    int16_t temperature = data->temperature;
    pack[1] = (temperature) >> 8;
    pack[2] = 0;          //Round off decimals

    /// Encoding 48 bits using Base64 produces max 8 chars.
    memset(&(url[base_length]), 0, sizeof(URL_PAYLOAD_LENGTH));
    base64encode(pack, sizeof(pack), &(url[base_length]), URL_PAYLOAD_LENGTH);
}


Here is quick tour how you can build the fw (assumes that you got everything installed to build ruuvitag_fw:

cd /path/to/ruuvitag_fw/ 
make

nrfutil pkg generate --debug-mode --application ruuvi_examples/weather_geocache/ruuvitag_b3/s132/armgcc/_build/weather_geocache.hex --key-file keys/ruuvi_open_private.pem app_dfu_package.zip

Then upload the dfu zip to your ruuvitag using nRF Toolbox
