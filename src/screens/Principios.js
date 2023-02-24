import React, { useState, useContext } from 'react';
import { View, SafeAreaView, ScrollView } from 'react-native';
import { scale, verticalScale, moderateScale, ScaledSheet } from 'react-native-size-matters';
import { ThemeContext } from '../context/Context';
import { List, Paragraph, Title } from 'react-native-paper';


const Principios = () => {

  const [expandedNatureza, setExpandedNatureza] = useState(false);
  const [expandedVirtude, setExpandedVirtude] = useState(false);
  const [expandedControlar, setExpandedControlar] = useState(false);
  const [expandedSepare, setExpandedSepare] = useState(false);
  const [expandedAcao, setExpandedAcao] = useState(false);
  const [expandedInfort, setExpandedInfort] = useState(false);
  const [expandedFati, setExpandedFati] = useState(false);
  const [expandedChave, setExpandedChave] = useState(false);
  const { theme } = useContext(ThemeContext);

  const handlePressNatureza = () => setExpandedNatureza(!expandedNatureza);
  const handlePressVirtude = () => setExpandedVirtude(!expandedVirtude);
  const handlePressControlar = () => setExpandedControlar(!expandedControlar);
  const handlePressSepare = () => setExpandedSepare(!expandedSepare);
  const handlePressAcao = () => setExpandedAcao(!expandedAcao);
  const handlePressInfort = () => setExpandedInfort(!expandedInfort);
  const handlePressFati = () => setExpandedFati(!expandedFati);
  const handlePressChave = () => setExpandedChave(!expandedChave);

  const styles = ScaledSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: theme == false ? '#e9e9e9' : '#191919',
      paddingBottom: '65@mvs'
    }
  })

  return (

    <SafeAreaView style={styles.container}>
      <ScrollView indicatorStyle={theme == false ? 'black' : 'white'}>
        <List.Section
          title='Princípios Estoicos:'
          titleStyle={{ fontSize: scale(18), color: theme == false ? '#000' : '#e5e5e5', fontWeight: 'bold' }}>
          <List.Accordion
            title='Viva de acordo com a natureza'
            titleStyle={{ fontSize: scale(15), color: theme == false ? '#000' : '#e5e5e5', fontWeight: 'bold' }}
            expanded={expandedNatureza}
            onPress={handlePressNatureza}
            style={{ backgroundColor: theme == false ? '#e9e9e9' : '#191919', }}
          >
            <List.Item
              description={() => {

                return (

                  <View>
                    <Paragraph style={{ fontWeight: 'bold', color: theme == false ? '#000' : '#e5e5e5', fontSize: scale(13) }}>Trata-se de se comportar de forma racional como um ser humano, ao invés de aleatoriamente (ou por paixão e desejos) como uma fera. Devemos aplicar nossa habilidade natural da “razão” em todas as nossas ações.</Paragraph>
                    <Paragraph style={{ fontWeight: 'bold', color: theme == false ? '#000' : '#e5e5e5', fontSize: scale(13) }}>Se aplicarmos a razão viveremos de acordo com a natureza, agindo como seres humanos devem agir.</Paragraph>
                  </View>
                )
              }} />
          </List.Accordion>
          <List.Accordion
            title='Viva pela virtude'
            titleStyle={{ fontSize: scale(15), color: theme == false ? '#000' : '#e5e5e5', fontWeight: 'bold' }}
            expanded={expandedVirtude}
            onPress={handlePressVirtude}
            style={{ backgroundColor: theme == false ? '#e9e9e9' : '#191919' }}
          >
            <List.Item
              description={() => {

                return (

                  <View>
                    <View>
                      <Title style={{ fontWeight: 'bold', color: theme == false ? '#000' : '#e5e5e5', fontSize: scale(14) }}>Sabedoria</Title>
                      <Paragraph style={{ fontWeight: 'bold', color: theme == false ? '#000' : '#e5e5e5', fontSize: scale(13) }}>Ser sábio significa tomar decisões com excelência, realizar julgamentos com base na razão e diferenciar entre o certo e o errado. É a habilidade de navegar situações complexas de forma lógica, informada e calma.</Paragraph>
                    </View>
                    <View>
                      <Title style={{ fontWeight: 'bold', color: theme == false ? '#000' : '#e5e5e5', fontSize: scale(14) }}>Temperança</Title>
                      <Paragraph style={{ fontWeight: 'bold', color: theme == false ? '#000' : '#e5e5e5', fontSize: scale(13)}}>Ser moderado significa evitar o excesso, agir de forma equilibrada, ter autocontrole e não se deixar levar por desejos desenfreados. É o exercício da autorrestrição e moderação em todos os aspectos da vida. Significa não deixar a busca por prazeres se sobrepor à razão.</Paragraph>
                    </View>
                    <View>
                      <Title style={{ fontWeight: 'bold', color: theme == false ? '#000' : '#e5e5e5', fontSize: scale(14) }}>Justiça</Title>
                      <Paragraph style={{ fontWeight: 'bold', color: theme == false ? '#000' : '#e5e5e5', fontSize: scale(13) }}>Ser justo significa ser razoável, íntegro e honesto ao lidar com o outro. Tratar os outros justamente mesmo quando fazem algo errado. Sem a justiça, a sabedoria, coragem e temperança podem se transformar em vícios.</Paragraph>
                    </View>
                    <View>
                      <Title style={{ fontWeight: 'bold', color: theme == false ? '#000' : '#e5e5e5', fontSize: scale(14) }}>Coragem</Title>
                      <Paragraph style={{ fontWeight: 'bold', color: theme == false ? '#000' : '#e5e5e5', fontSize: scale(13) }}>Ser corajoso significa enfrentar situações amedrontadoras, incertas, intimidadoras e difíceis sem covardia não só em circunstâncias extraordinárias, mas ao encararmos desafios diários com claridade e integridade.</Paragraph>
                    </View>
                  </View>

                );
              }}
            />
          </List.Accordion>
          <List.Accordion
            title='Concentre-se no que pode controlar, aceite o que não pode'
            titleNumberOfLines={2}
            titleStyle={{ fontSize: scale(15), color: theme == false ? '#000' : '#e5e5e5', fontWeight: 'bold' }}
            expanded={expandedControlar}
            onPress={handlePressControlar}
            style={{ backgroundColor: theme == false ? '#e9e9e9' : '#191919' }}
          >
            <List.Item
              description={() => {

                return (

                  <View>
                    <Paragraph style={{ fontWeight: 'bold', color: theme == false ? '#000' : '#e5e5e5', fontSize: scale(13) }}>Não temos poder total sobre os eventos ao nosso redor, mas controlamos nossas ações, crenças e julgamentos. É por isso que agir de forma virtuosa é tão importante. Se agirmos, pensarmos e julgarmos de forma sábia, corajosa, moderada e justa, teremos uma boa vida.</Paragraph>
                    <Paragraph style={{ fontWeight: 'bold', color: theme == false ? '#000' : '#e5e5e5', fontSize:scale(13)}}> Se tentarmos controlar o incontrolável, teremos uma vida de sofrimento. Só controlamos nossas próprias ações e temos que aceitar o resultado com equanimidade.</Paragraph>
                    <Paragraph style={{ fontWeight: 'bold', color: theme == false ? '#000' : '#e5e5e5', fontSize: scale(13) }}>Teremos satisfação e confiança de saber que estamos fazendo o melhor e tentando tudo o que estiver ao nosso alcance para atingir nosso objetivo. Então,  podemos aceitar o resultado porque fizemos nosso melhor.</Paragraph>
                  </View>
                )
              }}
            />
          </List.Accordion>
          <List.Accordion
            title='Separe as coisas como sendo boas, ruins e indiferentes'
            titleNumberOfLines={2}
            titleStyle={{ fontSize: scale(15), color: theme == false ? '#000' : '#e5e5e5', fontWeight: 'bold' }}
            expanded={expandedSepare}
            onPress={handlePressSepare}
            style={{ backgroundColor: theme == false ? '#e9e9e9' : '#191919' }}
          >
            <List.Item
              description={() => {

                return (

                  <View>
                    <Paragraph style={{ fontWeight: 'bold', color: theme == false ? '#000' : '#e5e5e5', fontSize: scale(13) }}>O único bem é a virtude, que está em nosso encargo: ações, pensamentos e julgamentos sábios, corajosos, moderados e justos. O único mal é o vício, que também está em nosso encargo: ações, pensamentos e julgamentos ignorantes, covardes, libertinos e injustos. Tudo o mais é indiferente  porque não depende de nós.</Paragraph>
                    <Paragraph style={{ fontWeight: 'bold', color: theme == false ? '#000' : '#e5e5e5', fontSize: scale(13) }}>Portanto, não é o que você tem ou não tem, mas o que você faz com isso que importa. O que conta são suas ações. É tudo o que você controla. Todo o resto é indiferente. Ou seja, vida ou morte, boa ou má reputação, riqueza ou miséria, saúde ou doença.</Paragraph>
                  </View>
                )
              }}
            />

          </List.Accordion>
          <List.Accordion
            title='Tome ação'
            titleStyle={{ fontSize: scale(15), color: theme == false ? '#000' : '#e5e5e5', fontWeight: 'bold' }}
            expanded={expandedAcao}
            onPress={handlePressAcao}
            style={{ backgroundColor: theme == false ? '#e9e9e9' : '#191919' }}
          >
            <List.Item
              description={() => {

                return (

                  <View>
                    <Paragraph style={{ fontWeight: 'bold', color: theme == false ? '#000' : '#e5e5e5', fontSize: scale(13) }}>O estoicismo é uma filosofia de vida prática. Para os estoicos, não basta pensar em como viver a própria vida, mas realmente sair ao mundo e praticar suas ideias. Não devemos nos satisfazer apenas em aprender conceitos teóricos e abstratos e esperar a oportunidade ideal para experimentar o que aprendemos. Precisamos traduzir nossos pensamentos para a prática. Para um estoico, a adversidade é um treinamento.</Paragraph>
                  </View>
                )
              }}
            />

          </List.Accordion>
          <List.Accordion
            title='Pratique o infortúnio'
            titleStyle={{ fontSize: scale(15), color: theme == false ? '#000' : '#e5e5e5', fontWeight: 'bold' }}
            expanded={expandedInfort}
            onPress={handlePressInfort}
            style={{ backgroundColor: theme == false ? '#e9e9e9' : '#191919' }}
          >
            <List.Item
              description={() => {

                return (

                  <View>
                    <Paragraph style={{ fontWeight: 'bold', color: theme == false ? '#000' : '#e5e5e5', fontSize: scale(13) }}>A grande maioria das situações que vivemos são imprevistas. Como não é possível nos preparamos para todas elas, costumamos nos sentir ansiosos e nervosos quando as enfrentamos.</Paragraph>
                    <Paragraph style={{ fontWeight: 'bold', color: theme == false ? '#000' : '#e5e5e5', fontSize: scale(13) }}>O sábio prepara-se mentalmente. Nada pode acontecer que ele não tenha visto chegar. A premeditação da adversidade não faz com que tudo seja indolor e fácil de suportar. Mas isso nos ajuda a não entrar em pânico quando o problema acontece.</Paragraph>
                    <Paragraph style={{ fontWeight: 'bold', color: theme == false ? '#000' : '#e5e5e5', fontSize: scale(13) }}>Ao premeditar os males, treinamos nossa mente para lidar de forma calma e racional com cenários desfavoráveis e até catastróficos. Portanto, pergunte-se, "o que pode dar errado?".</Paragraph>
                  </View>
                )
              }}
            />

          </List.Accordion>
          <List.Accordion
            title='Amor Fati'
            titleStyle={{ fontSize: scale(15), color: theme == false ? '#000' : '#e5e5e5', fontWeight: 'bold' }}
            expanded={expandedFati}
            onPress={handlePressFati}
            style={{ backgroundColor: theme == false ? '#e9e9e9' : '#191919' }}
          >
            <List.Item
              description={() => {

                return (

                  <View>
                    <Paragraph style={{ fontWeight: 'bold', color: theme == false ? '#000' : '#e5e5e5', fontSize: scale(13) }}>O amor ao destino. É mais fácil mudar um evento que já aconteceu, ou o seu julgamento sobre o acontecido? Uma vez que o ocorrido está no passado, não há nada que possamos fazer para mudá-lo.</Paragraph>
                  </View>
                )
              }}
            />
          </List.Accordion>
          <List.Accordion
            title='Percepção é a chave'
            titleStyle={{ fontSize: scale(15), color: theme == false ? '#000' : '#e5e5e5', fontWeight: 'bold' }}
            expanded={expandedChave}
            onPress={handlePressChave}
            style={{ backgroundColor: theme == false ? '#e9e9e9' : '#191919' }}
          >
            <List.Item
              description={() => {

                return (

                  <View>
                    <Paragraph style={{ fontWeight: 'bold', color: theme == false ? '#000' : '#e5e5e5', fontSize: scale(13) }}>Nossa percepção pode se comportar como uma âncora, que nos prende e nos impede de navegar. Ou pode ser um vento forte que infla nossas velas e nos faz atravessar o oceano. De acordo com Epitecto, "não são eventos externos que incomodam as pessoas, são seus julgamentos internos a respeito deles que os incomodam ".</Paragraph>
                    <Paragraph style={{ fontWeight: 'bold', color: theme == false ? '#000' : '#e5e5e5', fontSize: scale(13) }}>É como vemos e entendemos o que acontece ao nosso redor e o que decidimos que esses eventos significam que as tornam o que são. Como você vê as coisas é muito mais importante do que as próprias coisas. Não controlamos eventos externos, mas controlamos como escolher vê-los e responder a eles. E, no final, isso é tudo que importa.</Paragraph>
                  </View>
                )
              }}
            />
          </List.Accordion>
        </List.Section>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Principios;