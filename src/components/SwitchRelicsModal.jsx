import React, { useEffect, useMemo } from 'react'
import { Button, Flex, Form, Modal, Select } from 'antd'
import { HeaderText } from 'components/HeaderText'
import { defaultGap } from 'lib/constantsUi'
import { Utils } from 'lib/utils'
import PropTypes from 'prop-types'
import { generateCharacterList } from 'lib/displayUtils'
import { useTranslation } from 'react-i18next'

export default function SwitchRelicsModal({ onOk, open, setOpen, currentCharacter }) {
  const [characterForm] = Form.useForm()
  window.characterForm = characterForm
  const characters = window.store((s) => s.characters)

  const { t } = useTranslation('modals', { keyPrefix: 'SwitchRelics' })

  const characterOptions = useMemo(() => generateCharacterList({
    currentCharacters: characters,
    excludeCharacters: [currentCharacter],
    withNobodyOption: false,
  }), [characters, currentCharacter, t])

  useEffect(() => {
    if (!open) return

    characterForm.setFieldsValue({
      characterId: null,
    })
  }, [characterForm, open])

  function onModalOk() {
    const { selectedCharacter } = characterForm.getFieldsValue()
    console.log('Switch relics modal submitted with:', selectedCharacter)
    onOk(selectedCharacter)
    setOpen(false)
  }

  const handleCancel = () => {
    setOpen(false)
  }

  const panelWidth = 300 - 47

  return (
    <Modal
      open={open}
      width={300}
      destroyOnClose
      centered
      onOk={onModalOk}
      onCancel={handleCancel}
      footer={[
        <Button key='back' onClick={handleCancel}>
          {t('Cancel')/* Cancel */}
        </Button>,
        <Button key='submit' type='primary' onClick={onModalOk}>
          {t('Save')/* Save */}
        </Button>,
      ]}
    >
      <Form
        form={characterForm}
        preserve={false}
        layout='vertical'
      >
        <Flex justify='space-between' align='center'>
          <HeaderText>{t('Title')/* Switch relics with character */}</HeaderText>
        </Flex>

        <Flex vertical gap={defaultGap}>
          <Flex gap={defaultGap}>
            <Form.Item size='default' name='selectedCharacter'>
              <Select
                labelInValue
                showSearch
                filterOption={Utils.titleFilterOption}
                style={{ width: panelWidth }}
                options={characterOptions}
              />
            </Form.Item>
          </Flex>
        </Flex>
      </Form>
    </Modal>
  )
}
SwitchRelicsModal.propTypes = {
  onOk: PropTypes.func,
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  currentCharacter: PropTypes.object,
}
