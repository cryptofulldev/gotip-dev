import React, { Component } from 'react';
import Aux from '../hoc/Au/Auxx';

import withErrorHandler from '../hoc/WithErrorHandler/WithErrorHandler';
import { withRouter } from 'react-router-dom';

import Modal from '../components/UI/Modal/Modal';
import axios from '../axios-instance';
import Layout from '../hoc/Layout/Layout';
import Cover from '../components/UI/Cover'
import UIkit from 'uikit';
import UIkitIcons from 'uikit/dist/js/uikit-icons'
UIkit.use(UIkitIcons)

import styled from 'styled-components';

import Sheet from '../components/Sheet';
import ListedTerms from '../components/Module/listedTerms';

const MainContainer = styled.div`
  max-width: 60%;
  width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const TermsContainer = styled.div`
  margin-top: 1em;
  padding: 1em 0.2em;
  border: solid #969696 2px;
  max-height: 60vh;
  overflow-y: scroll;
  background-color: #FFFFFF;
`
const termsOfUseData = [
  {
    heading: '第１条 はじめに',
    text: 
      `1この利用規約（以下「本利用規約」といいます）は、合同会社MDK（以下「弊社」といいます） が本サイト上で提供するサービスを、ユーザーが利用する際の一切の行為に適用されます。
      2本利用規約は、本サービスの利用条件を定めるものです。ユーザーは、本利用規約に従い本サービスを利用するものとします。
      3ユーザーは、本サービスを利用することにより、本利用規約の全ての記載内容について同意したものとみなされます。
      4弊社が、マシェリを通じて、随時発表する諸規定は、本規約の一部を構成するものとします。
      `
  },
  {
    heading: '第２条 定義',
    text: 
      `本利用規約において使用する用語の意義は、次の各号に定めるとおりとします。
      (1)本サイト弊社が運営する「GoTip」と称するウェブサイト（PCサイト　モバイルサイト　 ） をいいます。
      (2)本サービス本サイト上で提供される全てのサービスをいいます。
      (3)その他の利用規約等有料サービス利用規約、その他各サービスの利用規約等名称の如何に関わらず、 本利用規約以外の規定であって、本サービスの利用条件を定めるものをいいます。
      (4)ユーザーとは、本サイトを利用するために会員登録している者をいいます。
      (5)登録メールアドレス本サービスの提供を受ける目的で、ユーザーが弊社に提供したメールアドレスの情報をいいます。
      (6)パスワード本サービスを利用するに当たって、登録メールアドレス、会員IDと照合して本人を識別するための文字列をいいます。
      (7)投稿プロフィール、動画、インスタントメッセージ、画像やプロフ等本サービスを利用して投稿できる情報をいいます。
      `
  },
  {
    heading: '第３条 本利用規約の範囲',
    text: 
      `1本サイトには、本利用規約及びその他の利用規約等において、本サービスの利用条件が規定されています。
      その他の利用規約等は名称の如何に関わらず本利用規約の一部を構成するものとします。
      2本利用規約の規定とその他の利用規約等の規定が異なる場合は、当該その他の利用規約等の規定が優先して適用されるものとします。
      申込者が次の事由に該当する場合、弊社は、入会の承認をしないことがありますのでご了承ください。
      `
  },
  {
    heading: '第４条 本利用規約の変更',
    text: 
      `1弊社は、弊社の判断により、本利用規約をいつでも任意の理由で変更することができるものとします。
      2変更後の利用規約は、弊社が別途定める場合を除いて、本サイト上に表示した時点より効力を生じるものとします。
      3ユーザーが、本利用規約の変更の効力が生じた後に本サービスをご利用になる場合には、 変更後の利用規約の全ての記載内容に同意したものとみなされます。
      `
  },
  {
    heading: '第５条 個人情報の取扱い',
    text: 
      `弊社は、個人情報を「プライバシーポリシー」に基づき、適切に取り扱うものとします。
      (1)特定電気通信役務提供者の損害賠償責任の制限及び発信者情報の開示に関する法律 （平成13年法律第137号）第4条に基づく開示請求の要件が充足されたと弊社が判断した場合　当該開示請求の範囲内
      (2)他人の生命、身体又は財産の保護のために必要があると弊社が判断した場合　他人の生命、身体又は財産の保護のために必要な範囲内
      `
  },
  {
    heading: '第６条　通信の秘密',
    text: 
      `弊社は、次の各号に掲げる場合には、当該各号に定める範囲内において前項の守秘義務を負わないものとします。
      (1)刑事訴訟法（昭和23年法律第131号）又は犯罪捜査のための通信傍受に関する法律 （平成11年法律第137号）の定めに基づく強制の処分又は裁判所の命令が行われた場合　当該処分又は裁判所の命令の定める範囲内
      (2)法令に基づく強制的な処分が行われた場合　当該処分又は命令の定める範囲内
      (3)特定電気通信役務提供者の損害賠償責任の制限及び発信者情報の開示に関する法律 （平成13年法律第137号）第4条に基づく開示請求の要件が充足されたと弊社が判断した場合　当該開示請求の範囲内
      (4)他人の生命、身体又は財産の保護のために必要があると弊社が判断した場合　他人の生命、身体又は財産の保護のために必要な範囲内
`
  },
  {
    heading: '第７条 入会',
    text: 
      `1満18歳未満の者は、入会できません。
      2本サービスの利用を希望する者は、本利用規約の内容に同意した上で、弊社所定の方法により、入会の申込を行うものとします。
      3入会の申込をした者（以下「入会申込者」といいます。）は、弊社が入会の申込を承諾した時点でユーザーになります。
      4弊社は、本サービスで提供する機能やツールに、ユーザーの年齢による制限を設けることがあります。
      5弊社は、ユーザーに対して新サービスの告知、広告配信、サービス運営上の事務連絡、その他情報の提供を行います。 ただし、ユーザーが情報の提供を希望しない旨を、事前又は事後に弊社所定の方法で通知した場合は、本サービスの提供に必要な場合を除いて、 情報の提供を行わないものとします。
      `
  },
  {
    heading: '第８条 入会申込の不承諾',
    text: 
      `弊社は、次の各号のいずれかに該当する場合は、弊社の判断によって、入会申込者の入会申込を承諾しないことがあります。
      (1)入会申込者が、前条第2項の方法によらずに入会の申込を行った場合
      (2)入会申込者が、過去に本利用規約又はその他の利用規約等に違反したことを理由として強制退会処分を受けた者である場合
      (3)その他弊社が不適切と判断した場合
      `
  },
  {
    heading: '第９条　退会',
    text: 
      `1ユーザーが退会を希望する場合には、ユーザーは、弊社所定の方法により、弊社に退会の申出を行うものとします。
      2弊社は、ユーザーが次の各号に掲げるいずれかの行為を行った場合には、 弊社の判断によって、ユーザーを強制的に退会させて本サービスの利用をお断りすることがあります。
      (1)第7条第2項の方法によらずに入会の申込を行ったことが明らかとなった場合
      (2)本利用規約又はその他の利用規約等に違反した場合
      (3)その他弊社が不適切と判断した場合
      `
  },
  {
    heading: '第１０条　登録メールアドレス及びパスワードの管理',
    text: 
      `1ユーザーは、自分の管理に属する使用可能なメールアドレスを登録メールアドレスとして登録しなければならず、 当該登録メールアドレスが自己の管理に属さなくなったときには、 自己の管理に属する使用可能な別のメールアドレスに変更しなければならないものとします。
      2ユーザーは、自己の登録メールアドレス及びパスワードの不正利用の防止に努めるとともに、 その管理について一切の責任を持つものとします。
      3登録メールアドレスやパスワードが第三者に利用されたことによって生じた損害等につきましては、 弊社に重過失がある場合を除き、弊社はいかなる責任も負いません。
      `
  },
  {
    heading: '第１１条　アカウントの保有',
    text: 
      `1ユーザーは1人につき1つのアカウントを保有するものとします。
      1人が複数のアカウントを保有すること、複数人が1つのアカウントを共同して保有することはできません。
      ただし、弊社が別に認めたものを除きます。
      2ユーザーはいかなる場合においても、アカウントを第三者に譲渡又は貸与することはできません。
      `
  },
  {
    heading: '第１２条　利用環境の整備',
    text: 
      `1ユーザーは、本サービスを利用するために必要なあらゆる機器、ソフトウェア、通信手段を自己の責任と費用において、 適切に整備するものとします。
      2ユーザーは自己の利用環境に応じて、コンピューター・ウィルスの感染の防止、 不正アクセス及び情報漏洩の防止等のセキュリティ対策を講じるものとします。
      3弊社はユーザーの利用環境について一切関与せず、また一切の責任を負いません。
      `
  },
  {
    heading: '第１３条　ユーザーの責任',
    text: 
      `1ユーザーは、ユーザー自身の自己責任において本サービスを利用するものとし、 本サービスを利用してなされた一切の行為及びその結果について一切の責任を負います。
      2本サービスを利用してユーザーが投稿したプロフィールや画像等の情報に関する責任は、ユーザー自身にあります。 弊社はユーザーが本サービスを利用して投稿したプロフィール等の情報の内容について、一切責任を負いません。
      3ユーザーが他人の名誉を毀損した場合、プライバシー権を侵害した場合、許諾なく第三者の個人情報を開示した場合、 著作権法（昭和45年法律第48号）に違反する行為を行った場合その他他人の権利を侵害した場合には、 当該ユーザーは自身の責任と費用において解決しなければならず、弊社は一切の責任を負いません。
      `
  },
  {
    heading: '第１４条　禁止事項',
    text: 
      `ユーザーは、本サービスの利用にあたり、次に掲げる行為を行ってはならないものとします。
      禁止事項に違反した場合には、強制退会、利用停止、又は公開範囲の変更等の不利益な措置を採ることがあります。
      (1)弊社もしくは他者の著作権、商標権等の知的財産権を侵害する行為、又は侵害する恐れのある行為。
      (2)弊社もしくは他者の財産、プライバシーもしくは肖像権を侵害する行為、又は侵害する恐れのある行為。
      (3)弊社もしくは他者を不当に差別もしくは誹謗中傷し、他者への不当な差別を助長し、又はその名誉もしくは信用を毀損する行為。
      (4)自分以外の人物を名乗ったり、代表権や代理権がないにもかかわらずあるものと装ったり、 又は他の人物や組織と提携、協力関係にあると偽って本サービスを利用する行為。
      (5)詐欺、規制薬物/脱法薬物の濫用・売買・勧誘、児童売買春、預貯金口座及び携帯電話の違法な売買等の犯罪に結びつく、 又は結びつく恐れのある行為。
      (6)わいせつ、児童ポルノ又は児童虐待に相当する情報（以下、本号において｢これらの情報｣といいます）について、 次に掲げるいずれかの行為を行うこと。
      (ア)これらの情報を投稿又は表示する行為。
      (イ)これらの情報を収録した媒体を販売する行為。
      (ウ)これらの情報を収録した媒体の送信、表示、販売を想起させる投稿又は表示する行為。
      (7)面識のない異性との性交、わいせつな行為、出会い等を主な目的として利用する行為。
      (8)違法な賭博・ギャンブルを行わせ、又は違法な賭博・ギャンブルへの参加を勧誘する行為。
      (9)違法行為（けん銃等の譲渡、爆発物の製造、児童ポルノの提供、公文書偽造、殺人、脅迫等）を請け負い、仲介し、又は誘引する行為。
      (10)他人を自殺に誘引又は勧誘する行為。
      (11)性器を露出する行為、およびパフォーマーに性器の露出を要求する行為。
      (12)次に掲げる情報を投稿し、又は表示する行為。
      (ア)人の殺害、傷害現場を撮影した投稿
      (イ)死体を撮影した投稿
      (ウ)その他残虐な行為を撮影した投稿。
      (13)次に掲げる内容の日記等の情報を、本サイト内の投稿可能な箇所に投稿し、又は他のユーザーにメッセージで送信する行為。
      (ア)商業用の広告、宣伝又は勧誘を目的とする日記等の情報。ただし、弊社が別に認めたものを除く。
      (イ)アフィリエイトのリンクを含む投稿。
      (ウ)無限連鎖講（ネズミ講）、チェーンメール、MLM、リードメール等他人を勧誘する内容の投稿。
      (エ)金融機関等の口座番号を含む投稿。
      (オ)アダルトサイト、ワンクリック詐欺サイト、ウィルス等の有害なコンピュータプログラム等を流布させることを目的とするサイト等 弊社が不適切と判断するサイトに誘導する投稿（単にリンクを張る行為を含む。）。
      (カ)グロテスクな画像等の他のユーザーが不快を感じる可能性が高いと弊社が判断する投稿。
      (キ)その他弊社が不適切と判断する投稿。
      (14)1人が複数のアカウントを保有する行為又は複数人が1つのアカウントを共同して保有する行為。ただし、弊社が別に認めたものを除く。
      (15)18歳未満の方が本サービスを利用する行為。
      (16)弊社の設備に蓄積された情報を不正に書き換え、又は消去する行為。
      (17)ウィルス等の有害なコンピュータプログラム等を送信又は掲載する行為。
      (18)弊社又は他者のサーバーに負担をかける行為、もしくは、本サービスの運営やネットワーク・システムに支障を与える行為、 又はこれらの恐れのある行為。
      (19)その行為が前各号のいずれかに該当することを知りつつ、その行為を助長する目的でリンクを貼る行為。
      (20)法令、公序良俗又は本利用規約もしくはその他の利用規約等に違反し、又は他者の権利を侵害すると弊社が判断する行為。
      (21)その他、弊社が不適切と判断する行為。
      `
  },
  {
    heading: '第１５条　サービスの変更等',
    text: 
      `弊社は、弊社の都合により、本サービスをいつでも任意の理由で追加、変更、中断、終了することができます。
      `
  },
  {
    heading: '第１６条　利用料金',
    text: 
      `1登録及び一部サービスは無料とします。
      2弊社の利用料金およびその支払方法等については、本規約の他、別途、弊社が定め弊社サイトにて表示する料金規定に従うものとします。
      会員は、利用料金などに関わる消費税及びその他、賦課される税を負担するものとします。
      また、振り込み手数料その他の費用は、全て会員の負担とします。
      ポイントは減算方式によりカウントされます。
      `
  },
  {
    heading: '第１７条　利用料金の支払い',
    text: 
      `弊社の利用料金の支払方法は、次のとおりとします。又、いかなる場合も一旦支払い頂いた料金の払い戻しは一切行いません。
      (1)クレジットカード決済
      (2)コンビニエンスストア扱い各種決済
      (3)各種ISP決済
      (4)銀行振込決済
      `
  },
  {
    heading: '第１８条　ポイントの失効',
    text: 
      `購入もしくはキャンペーン、その他番組からの加算されたポイントは、最終ポイント購入日から起算して6ヶ月が経過した場合全て消失致します。
      入会時の無料体験ポイントについては入会日から起算して45日が経過した時点で消失致します。
      購入して得られるポイント以外で付与されるポイント（マイレージやプレゼントポイント）は、最終購入日から1ヶ月以内と定め、 それ以降については随時抹消されるものとします。
      `
  },
  {
    heading: '第１９条　サービスの転用の禁止',
    text: 
      `会員は、弊社の提供サ－ビスの全部または一部もしくは弊社の提供サ－ビスにかかるデ－タを、いかなる方法であれ、 他に転用し、第三者に提供もしくは使用させることまたは自己もしくは第三者の営業のために利用することはできません。
      会員がパフォーマーとの会話、インスタントメッセージ又は付随のメッセージサービスにて、パフォーマーの引き抜き行為や パフォーマーを本サービスと類似する他の有料サービス提供会社へ誘導する行為又はこれらの行為を目的としていることが明らかな 付随行為その他本サービスの円滑な運営を妨げる行為をされた場合、当社の被った被害の如何を問わず、 損害賠償として金１００万円を当該会員に対して請求できるものとします。
      いかなる事情があろうとも証拠となる裏付けがはっきりすれば、速やかに法的処置へ入るものとします。
      `
  },
  {
    heading: '第２０条　免責事項',
    text: 
      `1弊社は、ユーザーの通信や活動に関与しません。万一ユーザー間の紛争があった場合でも、当該ユーザー間で解決するものとし、 弊社はその責任を負いません。
      2弊社は、本サービスの内容の追加、変更、又は本サービスの中断、終了によって生じたいかなる損害についても、一切責任を負いません。
      アクセス過多、その他予期せぬ要因で表示速度の低下や障害等が生じた場合も同様とします。
      3弊社は単独の裁量により、インスタントメッセージサービス上で、またはそれを通じて行われるメッセージングの内容を含めて、 マシェリ上に掲示されるコンテンツを監視する権利を持ちます（が、義務は負いません）。
      弊社は、自社の基準に適合しない、または本契約書を遵守していない、あるいは攻撃的または違法である可能性がある、 あるいは他人の権利を侵害する、または安全を損ねる、または安全に対する脅威になると弊社が単独で判断する コンテンツを削除する権利を持ち続けます。
      弊社は、そうしたコンテンツの削除の失敗または遅延に関しては責任を負いませんが、 可能な範囲で必要な管理を行うよう努力致します。
      4弊社は、ユーザーによって投稿される情報の合法性、道徳性、信頼性、正確性について責任を負いません。
      5弊社は、次に掲げる場合には、当該投稿の情報の内容を閲覧したり、保存したり、第三者に開示すること （以下、本項において「閲覧等」といいます）ができるものとします。
      弊社は、それによって生じたいかなる損害についても、一切責任を負いません。
      (1)本サービスの技術的不具合の原因を解明し、解消するため必要な場合。
      (2)裁判所や警察などの公的機関から、法令に基づく正式な照会を受けた場合。
      (3)本利用規約に違反する行為又はその恐れのある行為が行われ、投稿の情報の内容を確認する必要が生じたと弊社が判断した場合。
      (4)人の生命、身体及び財産などに差し迫った危険があり、緊急の必要性があると弊社が判断した場合。
      (5)第6条第2項各号に掲げる事項に該当する場合。
      (6)その他本サイトを適切に運営するために必要が生じた場合。
      6弊社は、本利用規約又はその他の利用規約等に違反する行為又はその恐れのある行為が行われたと 信じるに足りる相当な理由があると判断した場合には、当該行為を行ったユーザーの強制退会処分、利用停止、 及び公開範囲の変更等を行う場合がありますが、それによって生じたいかなる損害についても、一切責任を負いません。
      `
  },
  {
    heading: '第２１条　準拠法及び管轄裁判所',
    text: 
      `1本利用規約の準拠法は、日本法とします。
      2ユーザーと弊社の間で訴訟の必要が生じた場合、東京地方裁判所を第一審の専属的合意管轄裁判所とします。
      附則
      本利用規約は2020年6月20日から施行します
      `
  }
]


class Terms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logining: false,
      errorModal: false,
      errorMessage: ""
    };

  }

  render() {
    const termsInfo = (
      <div>
        <article className="uk-article">
        <h2 className="uk-heading-divider">利用規約</h2>
          <p className="uk-article-meta">Terms of Service</p>
          <p className="uk-text-lead">会員様と当社との間には以下の規約が適用されます。</p>
        </article>
        <TermsContainer className="uk-card">
          <ListedTerms data={ termsOfUseData } />
        </TermsContainer>
      </div>
    )
      return (
      <Aux>
        <Layout {...this.props}>
            <Modal show={this.state.errorModal}>
                {this.state.errorMessage}        
            </Modal>
            <MainContainer>
              <Cover></Cover>
              <Sheet content={ termsInfo } />
            </MainContainer>     
        </Layout>
      </Aux>
    );
  }
}

export default withErrorHandler(withRouter(Terms), axios);

