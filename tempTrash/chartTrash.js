<VictoryChart width={850} height={350} theme={VictoryTheme.material}>             
            {topYellow && showYellow?  <VictoryGroup>   
              {/* loading via reducer            */}
              {/* {shouldBlurShow ? <VictoryBar style={{data:{fill: 'red', width:barWidth}}} data={redBlurData} x="quarter" y="earnings" /> : null}
              <VictoryBar style={{data:{fill: '#800000',  width: barWidth}}} data={redData} x="quarter" y="earnings" />
              {shouldBlurShow ? <VictoryBar style={{data:{fill: '#00ff00', width:barWidth}}} data={greenBlurData} x="quarter" y="earnings" /> : null}
              <VictoryBar style={{data:{fill: 'green', width: barWidth}}} data={greenData} x="quarter" y="earnings" />    */}

              {/* loading via file */}
              {shouldBlurShow && showRed ? <VictoryBar style={{data:{fill: 'red', width:barWidth}}} data={redBlurData} x="quarter" y="earnings" /> : null}
              {showRed ?  <VictoryBar style={{data:{fill: '#800000',  width: barWidth}}} data={redData} x="quarter" y="earnings" /> : null }
              {shouldBlurShow && showGreen ? <VictoryBar style={{data:{fill: '#00ff00', width:barWidth}}} data={greenBlurData} x="quarter" y="earnings" /> : null}
              {showGreen ? <VictoryBar style={{data:{fill: 'green', width: barWidth}}} data={greenData} x="quarter" y="earnings" /> : null }
              {shouldBlurShow && showYellow ? <VictoryBar style={{data:{fill: '#f9a602', width:barWidth}}} data={yellowBlurData} x="quarter" y="earnings" /> : null}
              {showYellow ? <VictoryBar style={{data:{fill: '#c49102', width: barWidth}}} data={yellowData} x="quarter" y="earnings" />  : null }   
            </VictoryGroup> : null}

            {topGreen && showGreen ?  <VictoryGroup>   
              {/* loading via reducer            */}
              {/* {shouldBlurShow ? <VictoryBar style={{data:{fill: 'red', width:barWidth}}} data={redBlurData} x="quarter" y="earnings" /> : null}
              <VictoryBar style={{data:{fill: '#800000',  width: barWidth}}} data={redData} x="quarter" y="earnings" />
              {shouldBlurShow ? <VictoryBar style={{data:{fill: '#00ff00', width:barWidth}}} data={greenBlurData} x="quarter" y="earnings" /> : null}
              <VictoryBar style={{data:{fill: 'green', width: barWidth}}} data={greenData} x="quarter" y="earnings" />    */}

              {/* loading via file */}
              {shouldBlurShow ? <VictoryBar style={{data:{fill: 'red', width:barWidth}}} data={redBlurData} x="quarter" y="earnings" /> : null}
              {showRed ?  <VictoryBar style={{data:{fill: '#800000',  width: barWidth}}} data={redData} x="quarter" y="earnings" /> : null }

              {shouldBlurShow && showYellow ? <VictoryBar style={{data:{fill: '#f9a602', width:barWidth}}} data={yellowBlurData} x="quarter" y="earnings" /> : null}
              {showYellow ? <VictoryBar style={{data:{fill: '#c49102', width: barWidth}}} data={yellowData} x="quarter" y="earnings" />  : null }   
              {shouldBlurShow ? <VictoryBar style={{data:{fill: '#00ff00', width:barWidth}}} data={greenBlurData} x="quarter" y="earnings" /> : null}
              {showGreen ? <VictoryBar style={{data:{fill: 'green', width: barWidth}}} data={greenData} x="quarter" y="earnings" /> : null }
            </VictoryGroup> : null}

            {topRed && showRed ?  <VictoryGroup>   
              {/* loading via reducer            */}
              {/* {shouldBlurShow ? <VictoryBar style={{data:{fill: 'red', width:barWidth}}} data={redBlurData} x="quarter" y="earnings" /> : null}
              <VictoryBar style={{data:{fill: '#800000',  width: barWidth}}} data={redData} x="quarter" y="earnings" />
              {shouldBlurShow ? <VictoryBar style={{data:{fill: '#00ff00', width:barWidth}}} data={greenBlurData} x="quarter" y="earnings" /> : null}
              <VictoryBar style={{data:{fill: 'green', width: barWidth}}} data={greenData} x="quarter" y="earnings" />    */}

              {/* loading via file */}

              {shouldBlurShow ? <VictoryBar style={{data:{fill: '#00ff00', width:barWidth}}} data={greenBlurData} x="quarter" y="earnings" /> : null}
              {showGreen ? <VictoryBar style={{data:{fill: 'green', width: barWidth}}} data={greenData} x="quarter" y="earnings" /> : null }
              {shouldBlurShow && showYellow ? <VictoryBar style={{data:{fill: '#f9a602', width:barWidth}}} data={yellowBlurData} x="quarter" y="earnings" /> : null}
              {showYellow ? <VictoryBar style={{data:{fill: '#c49102', width: barWidth}}} data={yellowData} x="quarter" y="earnings" />  : null }   
              {shouldBlurShow ? <VictoryBar style={{data:{fill: 'red', width:barWidth}}} data={redBlurData} x="quarter" y="earnings" /> : null}
              {showRed ?  <VictoryBar style={{data:{fill: '#800000',  width: barWidth}}} data={redData} x="quarter" y="earnings" /> : null }
            </VictoryGroup> : null}
           
      
          </VictoryChart>   