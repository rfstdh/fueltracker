<View style={styles.trackView}>                   
                {/* <DropDownPicker
                    items={[
                        {label: 'City', value: 'm'},
                        {label: 'Road', value: 't'},
                        {label: 'Highway', value: 'a'}
                    ]}
                    defaultValue={trackType.label}
                    containerStyle={{width: 200, height: 40,marginBottom: 50}}
                    style={{backgroundColor: '#fafafa'}}
                    itemStyle={{
                        justifyContent: 'flex-start'
                    }}
                    dropDownStyle={{backgroundColor: '#fafafa', marginBottom: 50}}
                    onChangeItem={item => setTrackType(item.value)}
                    placeholder="Select road type"
                /> */}
                <RNPickerSelect
            onValueChange={(value) => console.log(value)}
            items={[
                { label: 'Football', value: 'football' },
                { label: 'Baseball', value: 'baseball' },
                { label: 'Hockey', value: 'hockey' },
            ]}
        />
                {/* <View style={{width: '40%'}}>
                    {showPicker ? <Picker
                        selectedValue={trackType}
                        mode='dialog'
                        style={{width: '100%', height: 30}}
                        onValueChange={(itemValue, itemIndex) =>
                            setTrackType(itemValue)
                        }>
                        <Picker.Item label="City" value="m" />
                        <Picker.Item label="Road" value="t" />
                        <Picker.Item label="Highway" value="a" />
                    </Picker> : null }
                </View> */}
            </View>